import React from 'react'
import './index.less'

export default class Music extends React.Component {
    constructor(props) {
        super(props);
        Object.assign({
            // preload: true,
            autoPlay: true,
            loop: true,
            error: 5
        }, props);

        this.error = 0;
        this.state = {playing: false}
    }

    componentDidMount() {
        const audio = this.refs.audio.querySelector('audio.bgm');
        // dont work on chrome mobile
        // for ios? not try yet
        if (!!audio && !this.state.playing) {
            audio.load();
            audio.play();
            this.setState({playing: !audio.paused})
        }
    }

    handlePlayError() {
        const count = this.props.error;
        if (this.error > count) {
            const audio = this.refs.audio.querySelector('audio');
            this.refs.audio.removeChild(audio)
        }
        this.error++;
    }

    handlePlaying() {
        const audio = this.refs.audio;
        $(audio).addClass('active');
        this.setState({playing: true})
    }

    handlePause() {
        const audio = this.refs.audio;
        $(audio).removeClass('active');

        // if dont support loop
        if (this.state.playing && this.props.loop) {
            const target = audio.querySelector('audio');
            if (!target) return;
            target.load();
            target.play();
        }
    }

    handleAudioClick() {
        const audio = this.refs.audio.querySelector('audio');
        const playing = this.state.playing;
        this.setState({playing: !playing});
        if (!audio) return;
        playing ? audio.pause() : audio.play();
    }

    render() {
        const {...otherProps} = this.props;
        return <div className={this.state.playing ? 'music active' : 'music'} ref="audio"
                    onClick={this.handleAudioClick.bind(this)}>
            <audio className="bgm" {...otherProps}
                   onError={this.handlePlayError.bind(this)}
                   onPlaying={this.handlePlaying.bind(this)}
                   onPause={this.handlePause.bind(this)}/>
        </div>
    }
}