import { ButtonControls } from "./ButtonControls";
import { ListControls } from "./ListControls";
import { ParagraphControls } from "./ParagraphControls";
import { QuoteControls } from "./QuoteControls";
import { HeaderControls } from "./HeaderControls";

export const blockControlsMap = {
    button: ButtonControls,
    ul: ListControls,
    ol: ListControls,
    paragraph: ParagraphControls,
    quote: QuoteControls,
    header: HeaderControls
}