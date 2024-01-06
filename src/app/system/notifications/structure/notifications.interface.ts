export interface ILabelType {
    _id: string;
    code: string;
    value: string;
    active: boolean;
    ref1: string;
    ref2: string;
    check: boolean;
};

export interface IFilterType {
    name: string;
    type: string;
}

export interface INotification {
    labelType: ILabelType;
    filterType: IFilterType;
    update: boolean;
}