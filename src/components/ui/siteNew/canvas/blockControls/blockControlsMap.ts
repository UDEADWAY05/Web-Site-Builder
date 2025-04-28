import { ButtonControls } from "./ButtonControls";
import { ListControls } from "./ListControls";
import { ParagraphControls } from "./ParagraphControls";

export const blockControlsMap = {
    button: ButtonControls,
    ul: ListControls,
    ol: ListControls,
    paragraph: ParagraphControls
}