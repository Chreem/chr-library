import React from 'react'
import './index.less'
import on from './on.png'
import off from './off.png'

export default class Music extends React.Component {
    constructor(props) {
        super(props);
        this.params = Object.assign({
            // preload: true,
            autoPlay: true,
            loop: true,
            error: 5
        }, props);

        this.error = 0;
        this.state = {playing: false}
    }

    componentDidMount() {
        const audio = this.refs.audio.querySelector('audio');
        // dont work on chrome mobile
        // for ios? not try yet
        if (!!audio && !this.state.playing) {
            audio.load();
            audio.play();
            this.setState({playing: !audio.paused})
        }
    }

    handlePlayError() {
        const count = this.params.error;
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
        if (this.state.playing && this.params.loop) {
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
        return <div className="music" ref="audio"
                    onClick={this.handleAudioClick.bind(this)}>
            <img src={this.state.playing ? on : off} alt="playing"/>
            <audio {...this.params} onError={this.handlePlayError.bind(this)} onPlaying={this.handlePlaying.bind(this)}
                   onPause={this.handlePause.bind(this)}/>
        </div>
    }
}