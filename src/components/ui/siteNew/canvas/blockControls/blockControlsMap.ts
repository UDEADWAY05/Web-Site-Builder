import { ButtonControls } from "./ButtonControls";
import { ListControls } from "./ListControls";
import { ParagraphControls } from "./ParagraphControls";
import { QuoteControls } from "./QuoteControls";
import { HeaderControls } from "./HeaderControls";
import { DividerControls } from "./DividerControls";
import { ImageControls } from "./ImageControls";
import { TextareaControls } from "./TextareaControls";
import { InputControls } from "./InputControls";
import { CheckboxControls } from "./CheckboxControls";
import { RadioboxControls } from "./RadioboxControls";
import { SelectControls } from "./SelectControls";
import { Block } from "src/store/slices/siteSlice";
import { BackGroundControls } from "./backgroundControls";

export const blockControlsMap:Record<Block['type'],React.ElementType> = {
    button: ButtonControls,
    ul: ListControls,
    ol: ListControls,
    paragraph: ParagraphControls,
    quote: QuoteControls,
    header: HeaderControls,
    divider: DividerControls,
    image: ImageControls,
    textarea: TextareaControls,
    input: InputControls,
    checkbox: CheckboxControls,
    radiobox: RadioboxControls,
    select: SelectControls,
    background: BackGroundControls,
}