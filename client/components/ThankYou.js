import React, {Component} from 'react';

class ThankYou extends Component{
  componentDidMount() {
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.rate=0.5;
    this.utterance.text = `Thank you for submitting the application. Your reference number is 2018 123 69 0000 021 `;
    this.synth.speak(this.utterance);
  }
  render() {
    return (
      <div className="content">
        <div className="has-text-centered">
          <p>Thank you for submitting the application. Your reference number is mentioned below</p>
          <h4 className="subtitle">2018 123 69 0000 021</h4>
        </div>
      </div>
    );
  }
  
};

export default ThankYou;
