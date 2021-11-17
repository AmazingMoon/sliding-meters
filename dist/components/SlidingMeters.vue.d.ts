declare const _default: import("vue").DefineComponent<{
    minHeight: {
        type: StringConstructor;
        default: string;
    };
    initCursor: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
}, {
    onAccepted: ((...args: any[]) => any) | undefined;
    minHeight: string;
    initCursor: string;
    duration: number;
    height: import("vue").Ref<string>;
    unitNumber: number;
    unitArr: string[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "accepted"[], "accepted", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    minHeight?: unknown;
    initCursor?: unknown;
    duration?: unknown;
} & {
    minHeight: string;
    initCursor: string;
    duration: number;
} & {}> & {
    onAccepted?: ((...args: any[]) => any) | undefined;
}, {
    minHeight: string;
    initCursor: string;
    duration: number;
}>;
export default _default;
