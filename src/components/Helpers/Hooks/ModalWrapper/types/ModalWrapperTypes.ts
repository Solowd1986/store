export interface PropsModal {
    bg?: boolean,
    interactions?: boolean
}

export interface InnerComponentProps {
    [key: string]: (evt?: any) => void

}
