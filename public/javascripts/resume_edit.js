function isValidForm() {
    return false;
}


class EducationElement extends React.Component {

    constructor(props) {
        super(props);


        
        this.state = {
            school: '',
            yearStart: '',
            yearEnd: '',
            degree: '',
        };
    }


    handleNameChange(event) {
        this.setState({
            school: event.target.value
        });
    }

    handleStartTimeChange(event) {
        this.setState({
            yearStart: event.target.value
        });
    }

    handleEndTimeChange(event) {
        this.setState({
            yearEnd: event.target.value
        });
    }

    handleDegreeChange(event) {
        this.setState({
            degree: event.target.value
        });
    }

    echo() {
        console.log("Hello World: ");
    }

    render() {


        //     var schoolName = '';
//     var schoolStartTime = '';
//     var schoolEndTime = '';
//     var degree = '';

//     if (component) {
//         schoolName = component.school;
//         schoolStartTime = component.yearStart;
//         schoolEndTime = component.yearEnd;
//         degree = component.degree;
//     }

        return (
            <div className="education-items">
                <hr />
                <div className="form-group">
                    <label className="form-label">學校</label>
                    <input className="form-control school-name" id="form1Name" name="form1Name" type="text"  required />
                </div>

                <div className="form-group">
                    <label className="form-label">期間</label>
                    <div className="row form-row">
                        <div className="col-md-6">
                            <input id="form3City" type="text" className="form-control school-start-time" placeholder="開始時間"  />
                        </div>
                        <div className="col-md-6">
                            <input id="form3State" type="text" className="form-control school-end-time" placeholder="結束時間"/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input className="form-control school-degree" id="form1Phone" name="form1Phone" type="text" required />
                </div>

                <button className="btn btn-warning btn-cons school-delete" type="button" onClick={this.echo}>刪除</button>
            </div>
        );
    }
}


function onNewElement() {

}

const container = document.getElementById("education-groups");
const root = ReactDOM.createRoot(container);


var elementList = [];
for (var i = 0; i < 5; i++) {
    const id = "education-" + i;
    elementList.push(<EducationElement id={id} key={i} index={i}/>);
}

// if (userData.educations) {

//     for (var i = 0; i < userData.educations.length; i++) {
//         var educationElement = userData.educations[i];
//         const educationComp = (
//             <EducationElement education={educationElement}/>
//         );
//         elementList.push(educationComp);
//     }

// } else {
//     const educationComp = (
//         <EducationElement />
//     );
//     elementList.push(educationComp);
// }


root.render(
    <>
        {elementList}
    </>
);


function onSave() {
    // const target = document.getElementById("education-3");
    // console.log(target);
    // target.echo();


    console.log(elementList[3]);
    
}


$("#education-save").click(function() {
    try {
        onSave();
    } catch (error) {
        console.log(error);
    }
    return false;
});




// var tempData = [];

// $(document).ready(function() {	
    
//     loadEducations();





// function loadEducations() {
//     console.log(userData);  
//     if (userData.educations) {
//         tempData = structuredClone(userData.educations);
//     }
//     console.log(tempData);
//     updateTempEducationData();
// }

// function updateTempEducationData() {
//     const container = document.getElementById("education_body");
//     const root = ReactDOM.createRoot(container);




//     // var educationBody = $("#education_body");



//     // educationBody.empty();

//     // if (tempData.length == 0) {
//     //     const educationItemsString = getEducationComponent(0, null);
//     //     educationBody.append(educationItemsString);
//     // } else {
//     //     for (var i = 0; i < tempData.length; i++) {
//     //         const element = tempData[i];
//     //         var educationItemsString = getEducationComponent(i, element);
//     //         educationBody.append(educationItemsString);
//     //     }
//     // }

//     const actiionElement = (
//         <div className="form-actions education-actions">

//             <div className="pull-right">
//                 <button id="education-save" className="btn btn-success btn-cons" type="submit"><i className="icon-ok"></i> 儲存</button>
//                 <button id="education-restore" className="btn btn-white btn-cons" type="button">復原</button>
//             </div>
//         </div>
//     );

//     // var actionsString = '<div class="form-actions education-actions">' +
//     //                     '  <div class="pull-right">' +
//     //                     '    <button id="education-save" class="btn btn-success btn-cons" type="submit"><i class="icon-ok"></i> 儲存</button>' +
//     //                     '    <button id="education-restore" class="btn btn-white btn-cons" type="button">復原</button>' +
//     //                     '  </div>' +
//     //                     '</div>';

//     // educationBody.append(actionsString);
//     // updateScripts();

//     root.render(actiionElement);




// }

// function getEducationComponent(elementIndex, educationComponent) {

//     var schoolName = '';
//     var schoolStartTime = '';
//     var schoolEndTime = '';
//     var description = '';

//     if (educationComponent) {
//         schoolName = educationComponent.school;
//         schoolStartTime = educationComponent.yearStart;
//         schoolEndTime = educationComponent.yearEnd;
//         degree = educationComponent.degree;
//     }

    // return '<div class="education-items">' +
    //     '    <hr/>' +
    //     '    <div class="form-group">' +
    //     '        <label class="form-label">學校</label>' +
    //     '        <input class="form-control school-name" id="form1Name" name="form1Name" type="text" value=\'' + schoolName + '\' required>' +
    //     '    </div>' +
    //     '    ' +
    //     '    <div class="form-group">' +
    //     '        <label class="form-label">期間</label>' +
    //     '        <div class="row form-row">' +
    //     '        <div class="col-md-6">' +
    //     '            <input id="form3City" type="text" class="form-control school-start-time" placeholder="開始時間" value=\'' + schoolStartTime+'\'>' +
    //     '        </div>' +
    //     '        <div class="col-md-6">' +
    //     '            <input id="form3State" type="text" class="form-control school-end-time" placeholder="結束時間" value=\'' + schoolEndTime + '\'>' +
    //     '        </div>' +
    //     '        </div>' +
    //     '    </div>' +
    //     '    ' +
    //     '    <div class="form-group">' +
    //     '        <label class="form-label">敘述</label>' +
    //     '        <input class="form-control school-degree" id="form1Phone" name="form1Phone" type="text" value=\'' + description + '\' required>' +
    //     '    </div>' +
    //     '    ' +
    //     '    <button class="btn btn-warning btn-cons school-delete" type="button" id="school-delete-' + elementIndex + '" data-value=' + elementIndex + '>刪除</button>' +
    //     '</div>';                       
// }




// $("#education-add").click(function() {
//     console.log("add data");

//     var educationBody = $("#education_body");
//     var childrens = educationBody.children();
//     var emptyElement = getEducationComponent(childrens.length - 2, null);
//     //假設有5個children, 最後一個保留，在最後一個前面新增一個    
//     var lastChild = childrens[childrens.length - 1];
//     var lastChildClone = lastChild.cloneNode(true);
//     lastChild.remove();
//     educationBody.append(emptyElement);
//     educationBody.append(lastChildClone);
//     updateScripts();
// });


// function updateScripts() {
//     var educationBody = $("#education_body");

//     $(".school-delete").click(function() {
//         console.log("delete detect");
//         var index = $(this).data("value");
//         console.log("delete index = " + index);
//         var childrens = educationBody.children();
//         childrens[index].remove();
//     });
// }



// function onEducationSave() {

// }



// function onEducationElementDelete() {

// }

// });