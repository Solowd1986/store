function getTokenFromServer(res) {
  if (res.config.url === "token") {
    console.log("res", res);
  }
  return res;
}

function getErrorFromServer(err) {
  console.log("we got error");
  console.dir(err);
  //return err;
  return Promise.reject(err);
}

class ApiService {
  constructor() {
    this._axios = require("axios").default;

    this._decodeRecord = (recordName) => JSON.parse(decodeURIComponent(localStorage.getItem(recordName)));

    this.api = this._axios.create({
      baseURL: "/api/",
      timeout: 1000 * 5,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth") && this._decodeRecord("auth").auth.token}`,
      },
    });

    //this.api.interceptors.response.use(getTokenFromServer);
    //this.api.interceptors.response.use(getTokenFromServer);
  }

  get = (uri) => this.api.get(uri);
  post = (uri, opt = {}) => this.api.post(uri, opt);

  getToken = async () => {
    return await this.api.get("token");
  };




  /**
   * Этот вызов должен оборачиватсья в try/catch (пример action-db), с перехватом оишбок, редиректом и запретом dispatch
   * Если пришла ошибка от сервера, то редирект на 404 и возвращаем ответ выше.
   * Если таймер истек или от сервера 50-х ошибка, то retry 3 раза, на последний раз не перехватываем ошибку, она
   * всплываеет выше, и ловится, например, в catch, с редиректом на 500.
   */


  // fetchData = (routeData) => {
  //   const { match: { path: route, params: data }, history, } = routeData;
  //   const isThatIndexPage = !Object.keys(data).length;
  //   const uri = isThatIndexPage ? "index" : route.match(/\/([a-z]*)\/:/)[1] + "/" + Object.values(data).join("/");
  //   return this.api.get(uri).then(response => response);
  // };




  fetchDataAsync = async (routeData) => {
    const { match: { path: route, params: data }, history, } = routeData;
    const isThatIndexPage = !Object.keys(data).length;
    const uri = isThatIndexPage ? "index" : route.match(/\/([a-z]*)\/:/)[1] + "/" + Object.values(data).join("/");


    try {
      const response = await this.api.get(uri);
    } catch (error) {
      if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
        const response = await this.api.get(uri);
      }
    }

    return this.api
      .get(uri)
      .then((response) => {
        //console.dir(response);
        if (response.data.error) history.push("/404");
        return response;
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
          //console.log('fst fail');
          return this.api
            .get(uri)
            .then((result) => result)
            .catch((error) => {
              if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                //console.log('second fail');
                return this.api
                  .get(uri)
                  .then((result) => result)
                  .catch((error) => {
                    if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
                      //console.log('third fail');
                      return this.api.get(uri).then((result) => result);
                    }
                  });
              }
            });
        }
      });
  };
}

// return this.api
//   .get(uri)
//   .then((response) => {
//     console.dir(response);
//     if (response.data.error) history.push("/404");
//     return response;
//   })
//   .catch((error) => {
//     if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
//       //console.log('fst fail');
//       return this.api
//         .get(uri)
//         .then((result) => result)
//         .catch((error) => {
//           if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
//             //console.log('second fail');
//             return this.api
//               .get(uri)
//               .then((result) => result)
//               .catch((error) => {
//                 if (error.code === "ECONNABORTED" || /50[0-9]/.test(error.response.status.toString())) {
//                   //console.log('third fail');
//                   return this.api.get(uri).then((result) => result);
//                 }
//               });
//           }
//         });
//     }
//   });


export default new ApiService();
