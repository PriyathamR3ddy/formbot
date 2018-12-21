import React, {Component} from 'react';

class Review extends Component {
  componentDidMount(){
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.rate=0.8;
    this.utterance.text = `We have made to the application , Kindly review your details before we submit , We have got to know that your email address is ${this.props.prospectData.email} , your name to be on card is ${this.props.prospectData.firstName}${this.props.prospectData.lastName} and you have agreed to Terms and Conditions, Kindly let us know if we are good to submit your application `;
    this.synth.speak(this.utterance);
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new this.SpeechRecognition();
    this.recognition.lang = 'ja-JP';
    this.utterance.onend = () => {
      this.recognition.start();
    };

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log(text);
      if(text === 'yes' || text === 'submit' || text === 's') {
        document.getElementById('submitReview').click();
      }      
  }
}
  
  render(){
    return (
      <div className="content">
        <div>
          <h4>Review your details</h4>
          <ul>
            <li><strong>Email Address:</strong> {this.props.prospectData.email}</li>
            <li><strong>Name:</strong> {this.props.prospectData.title} {this.props.prospectData.firstName} {this.props.prospectData.middleName} {this.props.prospectData.lastName}</li>
            <li>{this.props.prospectData.acceptTnc ? 'Agreed to Terms and Conditions' : 'Did not agree to Tesrms and Conditions'}</li>
          </ul>
        </div>
        <div className="has-text-centered">
          <button className="button is-info is-large" id="submitReview" onClick={() => this.props.submitApplication()}>Submit Application</button>
        </div>
      </div>
    );
  }  
};

export default Review;
