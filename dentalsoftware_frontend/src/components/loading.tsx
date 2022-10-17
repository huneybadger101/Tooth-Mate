import { AnimatedImage, View } from "@nodegui/react-nodegui";
import React from "react";
import loadingGIF from "../assets/Spinner.gif";
const fs = require('fs');

export class Loading extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        var data = fs.readFileSync("./dist/" + loadingGIF);

        this.state = {
            loading: data
        }
    }

    render() {
        return(
            <View id="mainView" style="flex: auto;">
                <AnimatedImage id="loading" minSize={{width: 200, height: 200}} maxSize={{width: 200, height: 200}} size={{width: 200, height: 200}} enabled={true} buffer={this.state.loading}/>
            </View>
        )
    }
}

export default Loading;