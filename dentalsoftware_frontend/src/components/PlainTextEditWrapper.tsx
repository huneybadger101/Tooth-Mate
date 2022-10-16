import React from "react";
import { PlainTextEdit } from "@nodegui/react-nodegui";

const plainTextRef:any = React.createRef();
const PlainTextEditWrapper = (props: any) => {
React.useEffect(() => {
  plainTextRef.current.addEventListener("textChanged", () =>
    props.callback(plainTextRef.current.toPlainText())
  );
});
return (
    <PlainTextEdit ref={plainTextRef}/>
 );
};
export default PlainTextEditWrapper