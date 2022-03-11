import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection } from "./FormField";
import { TextField  } from "./FormField";
import {  EntryWithoutId } from "../types";
import { useStateValue } from "../state";


export type PatientEntryValues = EntryWithoutId;

interface Props {
  onSubmit: (values: PatientEntryValues) => void;
  onCancel: () => void;
}


export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "OccupationalHealthcare",
        specialist: "",
        employerName: "",
        description: "",



        
       
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
      
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Employers Name"
              placeholder="Employers Name"
              name="employerName"
              component={TextField}
            />
             <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />

<DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />    
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
