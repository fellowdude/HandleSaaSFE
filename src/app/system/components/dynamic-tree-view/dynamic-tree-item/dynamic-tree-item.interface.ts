export interface ITreeViewItem {
    title?: string;
    checked?: boolean;
    internalIndex?: string;
    expanded?: boolean;
    parent?: ITreeViewItem;
    children?: Array<ITreeViewItem>;
    partialSelected?: boolean;
}
