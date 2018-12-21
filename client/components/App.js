import React from 'react';
import EnableVoice from './EnableVoice';
import DisableVoice from './DisableVoice';
import Form from './Form';
import ThankYou from './ThankYou';
import Transcript from './Transcript';
import Review from './Review';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voice: false,
      statements: [],
      prospectData: null,
      review: true
    };
    this.toggleVoice = this.toggleVoice.bind(this);
    this.updateTranscript = this.updateTranscript.bind(this);
    this.setProspectData = this.setProspectData.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
  }

  toggleVoice() {
    this.setState({ voice: !this.state.voice });
  }

  updateTranscript(statement) {
    this.setState({ statements: this.state.statements.concat(statement) });
  }

  setProspectData(formData) {
    this.setState({ prospectData: formData });
  }

  submitApplication() {
    this.setState({ review: false });
  }

  render() {
    return (
      <section className="section container">
        <div className="tile is-ancestor is-vertical">
          <div className="tile is-parent">
            <article className="tile is-child has-text-centered">
              <h2 className="title is-2 has-text-centered">KIA</h2>
              {this.state.voice
                ? <DisableVoice toggleVoice={this.toggleVoice} />
                : <EnableVoice toggleVoice={this.toggleVoice} />
              }
            </article>
          </div>
          <div className="tile">
            <div className="tile is-parent">
              <article className="tile is-child box">
                {this.state.prospectData
                  ? (this.state.review ? <Review prospectData={this.state.prospectData} submitApplication={this.submitApplication} /> : <ThankYou />)
                  : <Form voice={this.state.voice} updateTranscript={this.updateTranscript} setProspectData={this.setProspectData} />
                }
              </article>
            </div>
            {/* {this.state.voice &&
              <div className="tile is-parent is-4">
                <article className="tile is-child box">
                  <Transcript statements={this.state.statements} />
                </article>
              </div>
            } */}
          </div>
        </div>
      </section>
    );
  }
}

export default App;
