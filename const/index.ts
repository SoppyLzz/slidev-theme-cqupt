export const vFromTo = ["ltr", "rtl"] as const

export const sAlign = ["start", "end", "center"] as const
export const sOverflow = ["hidden", "scroll", "auto"] as const
export const sDirection = ["vertical", "horizontal"] as const
export const sType = ["primary", "success", "info", "warning", "danger"] as const

export type CString = string[] | string
// for vertical layout
export type VFromTo = typeof vFromTo[number]
// for public
export type SDirection = typeof sDirection[number]
export type SAlign = typeof sAlign[number]
export type SOverflow = typeof sOverflow[number]
export type SType = typeof sType[number]

export const defaultCquptConfig: CquptConfig = {
    school: {
        badge: "/school_badge.svg",
        logo: "/school_logo.svg",
    },

    date: "",
    meeting: "meeting name",
    presenters: "presenter name",
    instructors: "instructor name",

    prefixes: {
        meeting: {
            icon: "SiBook",
            prefix: "会议"
        },
        date: {
            icon: "SiTime",
            prefix: "日期"
        },
        presenters: {
            icon: "SiUser",
            prefix: "汇报人"
        },
        instructors: {
            icon: "SiHat",
            prefix: "导师"
        }
    },
    // `background` is more than `name` attributes
    background: { name: "SDefault" },
    header: { name: "SNav" },

    // hidden won't influence section list
    hidden: ["s-cover", "s-sub-cover", "s-end", "s-toc", "s-vertical"],

    toc: { r: 10 },
    cols: { overflow: "hidden" }, // align function realized by a comp
    vertical: {
        view: "/test/view.jpg",
        fromTo: "ltr",
        overflow: "auto",
        direction: "horizontal",
    }
}

export type CIconItem = typeof defaultCquptConfig.icons[number]

export type CquptConfig = {
    school?: {
        badge?: string;
        logo?: string;
    }

    date?: string;
    meeting?: string,
    presenters?: CString;
    instructors?: CString;

    prefixes?: Record<CIconItem, any>;
    background?: Record<string, any>;
    header?: Record<string, any>;
    hidden?: CString;

    toc?: { r: number; };
    cols?: { overflow: SOverflow; };
    vertical?: {
        view?: string;
        fromTo?: VFromTo;
        overflow?: SOverflow;
        direction?: SDirection;
    };
}

export type CquptRoute = {
    layout?: string;
    section?: string;
    title?: string;
    no: number;
}

export const cKeys = ['section', 'title', 'no', 'layout'].concat(Object.keys(defaultCquptConfig))
export type CquptFrontMatter = CquptConfig & CquptRoute;