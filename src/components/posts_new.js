import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {

    renderField(field){
        const { meta: { touched, error } } = field; // destructuring
        const className = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                        {touched ? error : ''}
                </div>

            </div>

        );

    }

    onSubmit(values) {
        // this === component
        console.log(values);
    }


    render(){
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Post Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">submit</button>

            </form>
        );
    }
}

function validate(values) {

    const errors = {};
    // Validate the inputs from 'values'
    if (!values.title){
        errors.title="Enter a title"
    }
    // if (values.title.length() < 3){
    //     errors.title="Enter a title that is at least 3 characters!"
    // }
    if (!values.categories){
        errors.categories="Enter some categories"
    }
    if (!values.content){
        errors.content="Enter some content please!"
    }
    // if errors is empty, the form is fine to submit
    // if errors has *any* properties, redux for assumes form is invalid
    return errors;

}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);