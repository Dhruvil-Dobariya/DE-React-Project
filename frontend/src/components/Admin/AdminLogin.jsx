const AdminLogin = () => {
  return (
    <div>
      <div className="containers">
        <h2 style={{ fontSize: "30px" }}>Login</h2>

        <div className="role-selection">
          <label htmlFor="role-student">Role</label>
          <input
            type="radio"
            name="role"
            id="role-student"
            value="Student"
            defaultChecked
            required
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="role-student">Student</label>
          <input
            type="radio"
            name="role"
            id="role-faculty"
            value="Faculty"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="role-faculty">Faculty</label>

          <input
            type="radio"
            name="role"
            id="role-admin"
            value="Admin"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="role-admin">Admin</label>
        </div>

        <form onSubmit={handleSubmit}>
          {role === "Student" ? (
            <div className="student-field">
              <label htmlFor="En_num">
                <strong>Enrollment Number</strong>
              </label>
              <input
                type="number"
                placeholder="Enter Enrollment Number"
                id="En_num"
                minLength={12}
                maxLength={12}
                onChange={(event) => setEn_num(event.target.value)}
                required
              />
            </div>
          ) : (
            <div className="faculty-field">
              <label htmlFor="exampleInputEmail1">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          )}

          <div className="password-field">
            <label htmlFor="exampleInputPassword1">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            onClick={role === "Student" ? UserLogin : FacultyLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
