


function isEducationEmpty(education) {
    if (!education) {
        return true;
    }

    var isSchoolEmpty = (education.school && education.school !== '') ? false : true;
    var isYearStartEmpty = (education.yearStart && education.yearStart !== '') ? false : true;
    var isYearEndEmpty = (education.yearEnd && education.yearEnd !== '') ? false : true;
    var isDegreeEmpty = (education.degree && education.degree !== '') ? false : true;

    return isSchoolEmpty && isYearStartEmpty && isYearEndEmpty && isDegreeEmpty;
}

function newEducation() {
    return {
        id: uuidv4(),
        school: '',
        yearStart: '',
        yearEnd: '',
        degree: ''
    };
}

class EducationElement extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleDegreeChange = this.handleDegreeChange.bind(this);

        const education = props.education;
        
        this.state = {
            school: education.school,
            yearStart: education.yearStart,
            yearEnd: education.yearEnd,
            degree: education.degree,
            id: props.eId
        };
    }


    handleNameChange(event) {
        this.setState({
            school: event.target.value
        });
        this.props.onNameChange(event.target.value);

    }

    handleStartTimeChange(event) {
        this.setState({
            yearStart: event.target.value
        });
        this.props.onStartTimeChange(event.target.value);
    }

    handleEndTimeChange(event) {
        this.setState({
            yearEnd: event.target.value
        });
        this.props.onEndTimeChange(event.target.value);
    }

    handleDegreeChange(event) {
        this.setState({
            degree: event.target.value
        });

        this.props.onDegreeChange(event.target.value);
    }

    onDelete() {
        this.props.onDelete(this.props.eId);

    }

    render() {

        return (
            <div className="education-items">
                <hr />
                <div className="form-group">
                    <label className="form-label">學校</label>
                    <input className="form-control school-name" id="form1Name" name="form1Name" type="text" value={this.state.school}  onChange={this.handleNameChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">期間</label>
                    <div className="row form-row">
                        <div className="col-md-6">
                            <input id="form3City" type="text" className="form-control school-start-time" value={this.state.yearStart}  onChange={this.handleStartTimeChange} placeholder="開始時間"  />
                        </div>
                        <div className="col-md-6">
                            <input id="form3State" type="text" className="form-control school-end-time" value={this.state.yearEnd}  onChange={this.handleEndTimeChange} placeholder="結束時間"/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input className="form-control school-degree" id="form1Phone" name="form1Phone" type="text"  onChange={this.handleDegreeChange} value={this.state.degree} required />
                </div>

                <button className="btn btn-warning btn-cons school-delete" type="button" onClick={()=>this.onDelete()}>刪除</button>
            </div>
        );
    }
}

class EducationApp extends React.Component {


    constructor(props) {
        super(props);

        var educationList = [];
        if (props.educations) {
            educationList = props.educations;
        } else {
            educationList.push(newEducation());
        }

        this.state = {
            educations: educationList,
        };

        this.addClick = this.addClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.resetClick = this.resetClick.bind(this);
        this.deleteClick = this.onElementDelete.bind(this);

    }

    addClick() {
        var educationList = this.state.educations;
        var lastEducation = educationList[educationList.length - 1];
        var isLastEmpty = isEducationEmpty(lastEducation);
        if (isLastEmpty) return;
        educationList.push(newEducation());

        console.log(educationList[0].degree);

        this.setState({
            educations: educationList
        });
    }

    async saveClick() {
        var educations = this.state.educations;
        var last = educations[educations.length - 1];
        var uploadEducation = [];
        for (var i = 0; i < educations.length; i++) {
            var education = educations[i];
            if (!isEducationEmpty(education)) {
                uploadEducation.push(education);
            }
        }
        const path = baseUrl + '/resume/education';

        await fetch(path, {
            method: 'POST',
            body: JSON.stringify(uploadEducation),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
      .then((response) => response.json())
      .then((data) => {
        alert("儲存成功");
      })
      .catch((err) => {
        alert("儲存失敗");
         console.log(err.message);
      });





    }

    resetClick() {

    }

    onElementDelete(id) {
        console.log("click id = " + id);
        var educationList = this.state.educations;
        //search target element by id
        var targetIndex = -1;
        for (var i = 0; i < educationList.length; i++) {
            if (educationList[i].id === id) {
                targetIndex = i;
                break;
            }
        }
        //remove target element
        if (targetIndex > -1) {
            educationList.splice(targetIndex, 1);
        }
        this.setState({
            educations: educationList
        });
    }

    render() {
        const educationList = this.state.educations;
        console.log(educationList);

        var educationInputElements = educationList.map((education) => {
            return <EducationElement 
            key={education.id} 
            eId={education.id} 
            education={education}
            onDelete={this.deleteClick}
            onStartTimeChange={(value) => {education.yearStart = value;}}
            onEndTimeChange={(value) => {education.yearEnd = value;}}
            onNameChange={(value) => {education.school = value;}}
            onDegreeChange={(value) => {education.degree = value;}}
            />;
        });

        return (

            <>
            <div className="grid simple form-grid">
                <div className="grid-title no-border">
                  <h4>學歷</h4>
                  <div className="tools">
                    <a href="#" className="collapse"></a>
                    <a href="#" id="education-add" onClick={this.addClick}><i className="material-icons">add</i></a>
                  </div>
                </div>
                <div className="grid-body no-border">
                  <div id="education_body" name="education_body" role="form" className="validate" >


                    <div id="education-groups">
                        {educationInputElements}
                    </div>



                    <div className="form-actions education-actions">

                      <div className="pull-right">
                          <button id="education-save" className="btn btn-success btn-cons" onClick={this.saveClick}><i className="icon-ok"></i> 儲存</button>
                          <button id="education-restore" className="btn btn-white btn-cons" type="button" onClick={this.resetClick}>復原</button>
                      </div>
                    </div>
                    
                  </div>
                </div>
            </div>
            </>
        
        );
    }
}

const educationContainer = document.getElementById("education-app");
const educationRoot = ReactDOM.createRoot(educationContainer);

console.log(userData);


educationRoot.render(<EducationApp educations={userData.educations}/>);





