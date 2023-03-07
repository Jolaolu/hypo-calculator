/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}
declare module '~icons/*' {
    import { FunctionalComponent, SVGAttributes } from 'vue';
    const component: FunctionalComponent<SVGAttributes>;
    export default component;
}