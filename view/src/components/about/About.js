import React, {Fragment} from 'react';

const About = () => {
    return (
        <Fragment>
            <div className="py-1">
                <h2 className="abt-intro">memoRandom is a web application where you can list your todos along with a completion date. You can add, remove or edit your tasks, add labels to them and change their status. Create your own account and get started.</h2>
            </div>
            <div>
            <h2 className="abt-thin-header">Perks</h2>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header">Salient features</h2>
                <p>Add, Edit and Modify from anywhere, 24x7</p>
                <p>Fast, Secure & Dependable WebApp</p>
                <p>User Friendly Interface</p>
                <p>Mobile device Friendly</p>
                <p>Compatible with all modern Browsers</p>
            </div>
            <h2 className="abt-thin-header">User Guide</h2>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header">The Home Page</h2>
                <p>Home Page has three sections. The form to input your data. The Filter section. The Todo Cards, that are sorted by their Date-Time.</p>
                <p style={{fontStyle: 'italic'}}>Only the Todo Cards that are NOT archived are displayed here.</p>
            </div>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header">The Text input area</h2>
                <p>Put your Todo items, Reminders or any thought in text format.</p>
                <h2 className="abt-header">Due Date-Time</h2>
                <p>Put the Date and Time or the Deadline of the Todo item, within which you have to finish the work.</p>
                <h2 className="abt-header">Labels</h2>
                <h3 className="abt-sub-header"><i className="fas fa-user-check"></i> Personal</h3>
                <p>Your personal Todos. For example, 'Have medicine at 5PM'.</p>
                <h3 className="abt-sub-header"><i className="fas fa-briefcase"></i> Work</h3>
                <p>Work related reminders, like, 'Mail manager about participation in the project'.</p>
                <h3 className="abt-sub-header"><i className="fas fa-shopping-cart"></i> Shopping</h3>
                <p>Your shopping list.</p>
                <h3 className="abt-sub-header"><i className="fas fa-file-alt"></i> Others</h3>
                <p>Literally anything that you need to keep in mind.</p>
                <p style={{fontStyle: 'italic'}}>Please note that you can use One or more than One Labels</p>
                <h2 className="abt-header">Status</h2>
                <h3 className="abt-sub-header"><i className="fas fa-list-ul"></i> New</h3>
                <p>Use this for Todos which have recently come up and have sufficient time for you to finish.</p>
                <h3 className="abt-sub-header"><i className="fas fa-tasks"></i> In Progress</h3>
                <p>For tasks that are ongoing and urgent. The Text will be made bold for you to notice them at a glance.</p>
                <h3 className="abt-sub-header"><i className="fas fa-check"></i> Completed</h3>
                <p>For finished tasks. The Todo Card will be darkened and the the Text, struck off.</p>
                <p style={{fontStyle: 'italic'}}>You can select ONLY one Status type</p>
            </div>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header"><i className="fas fa-filter"></i> Filters</h2>
                <p>Options to sort your Todo Cards by different Criteria.</p>
                <p style={{fontStyle: 'italic'}}>Your search will consist of BOTH Archived & Un-Archived Todo Cards</p>
                <h3 className="abt-sub-header"><i className="fas fa-search"></i> Search by Label</h3>
                <p>There are four options, Personal, Work, Shopping, Others clicking which will sort the Todo Cards by the respective Label.</p>
                <h3 className="abt-sub-header"><i className="fas fa-search"></i> Search by Status</h3>
                <p>There are three options, New, In Progress, Completed, clicking which will sort the Todo Cards by the respective Status.</p>
                <h3 className="abt-sub-header"><i className="fas fa-sliders-h"></i> Custom Filter</h3>
                <p>Select different Labels, Status and Date-Time range for a unique Mixed Search.</p>
            </div>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header">The Todo Card</h2>
                <p>Box containing Your Todo text with relevant details.</p>
                <h3 className="abt-sub-header">Posting Date-Time</h3>
                <p>The Date-Time when the Todo Card is added.</p>
                <h3 className="abt-sub-header">The Text</h3>
                <p>The Todo Text that you've posted.</p>
                <h3 className="abt-sub-header"><i className="fas fa-archive"></i> Archived and <i className="fas fa-box-open"></i> Un-Archived Todo Cards</h3>
                <p>Keep your important Todo Cards saved in Archive or Remove is from Archive. You can find all Archived Todo Cards by clicking on the Archive icon in the Navbar.</p>
                <h3 className="abt-sub-header"><i className="fas fa-edit"></i> Edit Todo Cards</h3>
                <p>Edit your existing Todo Cards.</p>
                <h3 className="abt-sub-header"><i className="fas fa-trash-alt"></i> Delete Todo Cards</h3>
                <p>Delete your existing Todo Cards.</p>
                <h3 className="abt-sub-header">Due Date and Time</h3>
                <p>The deadline of your Task that you've posted.</p>
                <h3 className="abt-sub-header">Labelled as</h3>
                <p>The Label(s) you've chosen.</p>
                <h3 className="abt-sub-header">Status</h3>
                <p>The Status you've chosen. You can use the toggler to change the Status instantaneously.</p>
                <h3 className="abt-sub-header">Edited on</h3>
                <p>The Date-Time of your last Edit on the Todo Card</p>
            </div>
            <div style={{paddingBottom: '1rem'}}>
                <h2 className="abt-header"><i className="fas fa-user-circle"></i> User</h2>
                <p>You can click on your name or on the person icon to navigate to the User page.</p>
                <h3 className="abt-sub-header">Clear All Todos</h3>
                <p>Delete all Todo Cards permanently.</p>
                <h3 className="abt-sub-header">Delete account</h3>
                <p>Delete your account permanently.</p>
            </div>
            <h2 className="abt-thin-header">Developers</h2>
            <div style={{paddingBottom: '1rem'}}>
                <p>This web application has been developed by</p>
                <h3 className="abt-sub-header abt-name">Sulagna Roy - <a href={"https://www.linkedin.com/in/sulagna-roy-137b3a1a5/"} target='_blank' rel='noopener noreferrer'><i style={{color: '#0e76a8'}} className="fab fa-linkedin"></i></a></h3>
                <h3 className="abt-sub-header abt-name">Souvik Dey - <a href={"https://www.linkedin.com/in/souvik-dey-33ba481ab/"} target='_blank' rel='noopener noreferrer'><i style={{color: '#0e76a8'}} className="fab fa-linkedin"></i></a></h3>
                <h3 className="abt-header">Brief Technical Specification</h3>
                <p>The MERN stack (Mongo DB, Express, React, NodeJS) has been used to develop this project. We have used Sass to design the front-end.</p>
                
            </div>
            </div>
        </Fragment>
    )
}

export default About;