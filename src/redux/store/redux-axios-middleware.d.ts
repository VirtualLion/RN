
declare function axiosMiddleware(params:any) : any ;

declare module 'redux-axios-middleware' {
    export = axiosMiddleware;
}