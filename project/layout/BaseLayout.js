import React from 'react'
import DocumentTitle from 'react-document-title'

export default class extends React.Component {
    getTitle() {
        return 'Basic'
    }

    render() {
        return <DocumentTitle title={this.getTitle()}>
            <div>
                base
            </div>
        </DocumentTitle>
    }
}