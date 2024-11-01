import React, { useState, useEffect } from "react";
import {
  IonText, IonLabel, IonInput, IonItem, IonList, IonButton, IonCard,
  IonCardHeader, IonTitle, IonCardContent, IonCheckbox,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import userService from "../services/userService";
import { FormData, FormErrors } from "../utils/types";


const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contact: "",
    onWhatsApp: false,
    dateOfBirth: "",
    yearOfJoining: "",
    nextOfKin: "",
    parentContact: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    contact: "",
    dateOfBirth: "",
    yearOfJoining: "",
    nextOfKin: "",
    parentContact: "",
    password: "",
    form: ""
  });

  const [isTouched, setIsTouched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();

  const handleChange = (e: CustomEvent, field: keyof FormData) => {
    const value = field === "onWhatsApp" ? e.detail.checked : e.detail.value as string;
    setFormData({ ...formData, [field]: value });
    if (field !== "onWhatsApp") {
      validateField(field, value as string);
    }
  };

  const validateField = (field: keyof FormErrors, value: string) => {
    let errorMsg = "";

    switch (field) {
      case "name":
        errorMsg = value.length >= 3 ? "" : "Name must be at least 3 characters long.";
        break;
      case "email":
        errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
        break;
      case "contact":
        errorMsg = validateContact(value) ? "" : "Invalid contact number.";
        break;
      case "dateOfBirth":
        errorMsg = validateDateOfBirth(value) ? "" : "Date of Birth must be within the valid age range.";
        break;
      case "yearOfJoining":
        errorMsg = validateYearOfJoining(value) ? "" : "Year of Joining must be within the valid range.";
        break;
      case "nextOfKin":
        errorMsg = value.length >= 3 ? "" : "Next of kin name must be at least 3 characters.";
        break;
      case "parentContact":
        errorMsg = validateContact(value) ? "" : "Invalid parent contact number.";
        break;
      case "password":
        errorMsg = value.length >= 8 ? "" : "Password must be at least 8 characters long.";
        break;
      default:
        break;
    }

    setErrors({ ...errors, [field]: errorMsg });
  };

  const validateContact = (contact: string) => {
    const patterns = [/^07\d{8}$/, /^2567\d{8}$/, /^\+2567\d{8}$/];
    return patterns.some((pattern) => pattern.test(contact));
  };

  const validateDateOfBirth = (dateOfBirth: string): boolean => {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 10));
    const maxAgeDate = new Date(today.setFullYear(today.getFullYear() - 45));
    return dob <= minAgeDate && dob >= maxAgeDate;
  };

  const validateYearOfJoining = (yearOfJoining: string): boolean => {
    const [year] = yearOfJoining.split("-").map(Number);
    const currentDate = new Date();
    const cutoffYear = currentDate.getFullYear() - 30;
    return year >= cutoffYear && year <= currentDate.getFullYear();
  };

  useEffect(() => {
    setIsFormValid(Object.values(errors).every((error) => !error));
  }, [errors]);

  const markTouched = () => setIsTouched(true);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrors({ ...errors, form: "Please fill all fields correctly." });
      return;
    }
    try {
      await userService.registerUser({
        ...formData
      });
      history.push("/login");
    } catch (err) {
      setErrors({ ...errors, form: err instanceof Error ? `Registration failed: ${err.message}` : "Registration failed: An unknown error occurred." });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="registrationPage">
          <IonCardHeader>
            <IonText color="dark">
              <IonTitle size="large">Registration Form</IonTitle>
            </IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <form onSubmit={handleRegister} className="registrationForm">
                {errors.form && <IonText color="danger">{errors.form}</IonText>}
                <IonItem>
                  <IonLabel position="floating">
                    Name <IonText color="danger">*</IonText> {errors.name && <IonText color="danger">{errors.name}</IonText>}
                  </IonLabel>
                  <IonInput
                    className={`${errors.name ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="text"
                    value={formData.name}
                    onIonInput={(event) => handleChange(event, "name")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="floating">
                    Email <IonText color="danger">*</IonText> {errors.email && <IonText color="danger">{errors.email}</IonText>}
                  </IonLabel>
                  <IonInput
                    className={`${errors.email ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="email"
                    value={formData.email}
                    onIonInput={(event) => handleChange(event, "email")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>

                <IonItem>
                    <><IonLabel position="floating">
                      Contact <IonText color="danger">*</IonText> {errors.contact && <IonText color="danger">{errors.contact}</IonText>}
                    </IonLabel>
                    <IonInput
                      className={`${errors.contact ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                      fill="outline"
                      type="text"
                    value={formData.contact}
                    onIonInput={(event) => handleChange(event, "contact")}
                    onIonBlur={markTouched}
                    required
                    />
                    </>
                  {/* <IonLabel slot="end">WhatsApp</IonLabel> */}
                  <IonCheckbox
                    slot="end"
                    checked={formData.onWhatsApp}
                    onIonChange={(event) => handleChange(event, "onWhatsApp")}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    Date of Birth <IonText color="danger">*</IonText> {errors.dateOfBirth && <IonText color="danger">{errors.dateOfBirth}</IonText>}
                  </IonLabel>
                  <br />
                  <IonInput
                    class={`${errors.dateOfBirth ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="date"
                    value={formData.dateOfBirth}
                    onIonInput={(event) => handleChange(event, "dateOfBirth")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    Year of Joining <IonText color="danger">*</IonText> {errors.yearOfJoining && <IonText color="danger">{errors.yearOfJoining}</IonText>}
                  </IonLabel>
                  <br />
                  <IonInput
                    class={`${errors.yearOfJoining ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="month"
                    value={formData.yearOfJoining}
                    onIonInput={(event) => handleChange(event, "yearOfJoining")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="floating">
                    Next of Kin&apos;s Name <IonText color="danger">*</IonText> {errors.nextOfKin && <IonText color="danger">{errors.nextOfKin}</IonText>}
                  </IonLabel>
                  <IonInput
                    className={`${errors.nextOfKin ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="text"
                    value={formData.nextOfKin}
                    onIonInput={(event) => handleChange(event, "nextOfKin")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    Next of Kin&apos;s Contact <IonText color="danger">*</IonText> {errors.parentContact && <IonText color="danger">{errors.parentContact}</IonText>}
                  </IonLabel>
                  <IonInput
                    className={`${errors.parentContact ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="text"
                    value={formData.parentContact}
                    onIonInput={(event) => handleChange(event, "parentContact")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">
                    Password <IonText color="danger">*</IonText> {errors.password && <IonText color="danger">{errors.password}</IonText>}
                  </IonLabel>
                  <IonInput
                    className={`${errors.password ? "ion-invalid" : "ion-valid"} ${isTouched ? "ion-touched" : ""}`}
                    fill="outline"
                    type="password"
                    value={formData.password}
                    onIonInput={(event) => handleChange(event, "password")}
                    onIonBlur={markTouched}
                    required
                  />
                </IonItem>
                <IonButton type="submit" expand="block" disabled={!isFormValid}>
                  Register
                </IonButton>
                <IonItem>
                  <IonText>
                    Already have an account? <a href="/login">Login here</a>
                  </IonText>
                </IonItem>
              </form>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
      </IonPage>
  );
};

export default RegistrationPage;
