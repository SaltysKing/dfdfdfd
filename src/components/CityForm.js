import React, { useState, useRef } from "react";
import styles from "./CityForm.module.css";


const CityForm = (props) => {
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredCity = cityInputRef.current.value;
    // props.onAddMovie(movie);
    props.onSubmitHandler(enteredCity);
  };

  return (
    <>
      <form className={styles["form-control"]} onSubmit={submitHandler}>
        <div>
          <label htmlFor="city">Enter your city</label>
          <input
            id="city"
            type="text"
            ref={cityInputRef}
            placeholder="Atlanta"
          />
        </div>
      </form>
      {/* {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )} */}
    </>
  );
};

export default CityForm;