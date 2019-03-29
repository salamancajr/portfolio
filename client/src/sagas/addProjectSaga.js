import axios from "axios";
import { call, put } from "redux-saga/effects";
import { push } from 'react-router-redux';
import {ADD_PROJECT} from "../actions";
const PROJECTS_URL = "/api/api";

function setFormData(){
    var image = document.getElementById("upload").files[0];
    var form = document.getElementById("form");
    var bodyFormData = new FormData(form);
    bodyFormData.append("avatar", image);

    const request = axios({
        method: "post",
        url: PROJECTS_URL,
        data: bodyFormData,
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth': localStorage.getItem("token")
        }

    }).then(response => ({ response }))
    .catch(error => ({ error }))
}

export default function* addProject() {
    const {response, error} = yield call(setFormData)
    if (response){
        yield put({ type: ADD_PROJECT, payload: response })
        yield put(push("/Admin"))
    } else{
        console.log(`Error adding project: ${error}`)
    }
     
}