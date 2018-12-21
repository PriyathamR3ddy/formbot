import React from 'react';
import fields from '../fieldlist.json';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        acceptTnc: false
      },
      titles: ['Mr', 'Mrs', 'Miss', 'Ms'],
      firstLoad: true,
      showMicPhone: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleMiddleNameChange = this.handleMiddleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleTncChange = this.handleTncChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldFocus = this.handleFieldFocus.bind(this);
  }

  componentDidMount() {
    this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new this.SpeechRecognition();
    this.recognition.lang = 'ja-JP';
    // this.recognition.interimResults = false;
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.rate=1;
    this.prospectFields = document.querySelectorAll('.prospectField');
  }

  componentDidUpdate() {
    if (this.props.voice && this.state.firstLoad) {
      this.utterance.text = 'Welcome, I am Kia your companion. I will help you filling the form.';
      this.synth.speak(this.utterance);
      this.utterance.onend = () => {
        this.state.firstLoad = false;
        document.getElementById('email').focus();
      };
    }
  }

  handleEmailChange(event) {
    let form = this.state.form;
    form.email = event.target.value;
    this.setState({ form });
  }

  handleTitleChange(event) {
    let form = this.state.form;
    form.title = event.target.value;
    this.setState({ form });
  }

  handleFirstNameChange(event) {
    let form = this.state.form;
    form.firstName = event.target.value;
    this.setState({ form });
  }

  handleMiddleNameChange(event) {
    let form = this.state.form;
    form.middleName = event.target.value;
    this.setState({ form });
  }

  handleLastNameChange(event) {
    let form = this.state.form;
    form.lastName = event.target.value;
    this.setState({ form });
  }

  handleTncChange(event) {
    let form = this.state.form;
    form.acceptTnc = event.target.checked;
    this.setState({ form });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setProspectData(this.state.form);
  }

  handleFieldFocus(event) {
    if (this.props.voice) {
      const name = event.target.id;
      const currIndex = event.target.tabIndex;
      this.setState({ showMicPhone: currIndex });
      this.utterance.text = fields[name].voice;
      this.synth.speak(this.utterance);
      this.utterance.onend = () => this.recognition.start();
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log(text);
        let form = this.state.form;
        if (fields[name].type === 'checkbox') {
          if (text.toLowerCase() === 'yes' || text.toLowerCase() === 's') {
            form[name] = true;
          }
        } if(fields[name].type === 'button') {
          if(text.toLowerCase() === 'yes' || text.toLowerCase() === 's' || text.toLowerCase() === 'submit'){
            // document.getElementById('saveAndSubmit').click();
            this.handleSubmit(event);
          }
          else {
            document.getElementById('email').focus();
          }
        } else {
          if (text !== 'skip' && text !== 'skipskip' && text !== 'keep' && text !=='skip it' && text !== 'no' && text != 'skipit') {
            form[name] = text.replace(/ +/g, "");;
          }
        }
        this.setState({ form }, () => {
          this.prospectFields[currIndex + 1].focus();
        });
      }
    }
  }

  render() {
    const { email, title, firstName, middleName, lastName, acceptTnc } = this.state.form;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Email Address<span className="has-text-danger">*</span></label>
          <div className="control has-icons-right">
            <input id="email" type="email" className="input prospectField" tabIndex="0" placeholder="Email Address" value={email} onChange={this.handleEmailChange} onFocus={this.handleFieldFocus} />
            {this.state.showMicPhone === 0 && <span className="icon is-small is-right">
              <i className="fas fa-microphone"></i>
            </span>}
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Title<span className="has-text-danger">*</span></label>
              <div className="control has-icons-right">
                <div className="select is-fullwidth">
                  <select id="title" className="prospectField" tabIndex="1" value={title} onChange={this.handleTitleChange} onFocus={this.handleFieldFocus}>
                    <option value="" disabled>Title</option>
                    {this.state.titles.map((title) => <option key={title} value={title}>{title}</option>)}
                  </select>
                  {this.state.showMicPhone === 1 && <span className="icon is-small is-right">
                    <i className="fas fa-microphone"></i>
                  </span>}
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Legal First Name<span className="has-text-danger">*</span></label>
              <div className="control has-icons-right">
                <input id="firstName" type="text" className="input prospectField" tabIndex="2" placeholder="Legal First Name" value={firstName} onChange={this.handleFirstNameChange} onFocus={this.handleFieldFocus} />
                {this.state.showMicPhone === 2 && <span className="icon is-small is-right">
                  <i className="fas fa-microphone"></i>
                </span>}
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">Middle Name</label>
              <div className="control has-icons-right">
                <input id="middleName" type="text" className="input prospectField" tabIndex="3" placeholder="Middle Name" value={middleName} onChange={this.handleMiddleNameChange} onFocus={this.handleFieldFocus} />
                {this.state.showMicPhone === 3 && <span className="icon is-small is-right">
                  <i className="fas fa-microphone"></i>
                </span>}
              </div>
            </div>
            <div className="field">
              <label className="label">Surname<span className="has-text-danger">*</span></label>
              <div className="control has-icons-right">
                <input id="lastName" type="text" className="input prospectField" tabIndex="4" placeholder="Surname" value={lastName} onChange={this.handleLastNameChange} onFocus={this.handleFieldFocus} />
                {this.state.showMicPhone === 4 && <span className="icon is-small is-right">
                  <i className="fas fa-microphone"></i>
                </span>}
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-right">
            <input type="checkbox" id="acceptTnc" className="is-checkradio is-info prospectField" tabIndex="5" checked={acceptTnc} onChange={this.handleTncChange} onFocus={this.handleFieldFocus} />
            <label htmlFor="acceptTnc">Do you agree to the Terms and Conditions?</label>
            {this.state.showMicPhone === 5 && <span className="icon is-small is-right">
              <i className="fas fa-microphone"></i>
            </span>}
          </div>
        </div>
        <div className="field">
          <div className="control has-text-centered">
            <button id="saveAndSubmit" className="button is-info is-large prospectField" tabIndex="6" onFocus={this.handleFieldFocus}>Save and Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
