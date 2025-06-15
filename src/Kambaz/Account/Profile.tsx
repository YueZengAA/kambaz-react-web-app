import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        await client.updateUser(profile);
        dispatch(setCurrentUser(profile));
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kambaz/Account/Signin");
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    useEffect(() => { fetchProfile(); }, []);
    
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <Form.Control defaultValue={profile.username} id="wd-username" className="mb-2" 
                        onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
                    <Form.Control defaultValue={profile.password} id="wd-password" type="password" className="mb-2" 
                        onChange={(e) => setProfile({ ...profile, password:  e.target.value })} />
                    <Form.Control defaultValue={profile.firstName} id="wd-firstname" className="mb-2" 
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <Form.Control defaultValue={profile.lastName} id="wd-lastname" className="mb-2" 
                        onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
                    <Form.Control value={profile.dob?.slice(0, 10) || ""} id="wd-dob" className="mb-2" 
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
                    <Form.Control defaultValue={profile.email} id="wd-email" type="email" className="mb-2" 
                        onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
                    <select onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
                            className="form-control mb-2" id="wd-role">
                        <option value="USER">User</option>            <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                    <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
                        Sign out
                    </button>

                </div>)}
        </div>
    );
}