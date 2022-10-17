import './Register.css'
function Register() {
    return ( <div>
        <section className="register">
         <div className="container">
            <form>
                <h1>Đăng ký thành viên</h1>
                <div className="form-group">
                  <p>Email</p>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <div className="form-group">
                  <p>Mật khẩu</p>
                  <input type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <div className="form-group">
                  <p>Xác nhận mật khẩu</p>
                  <input type="password" className="form-control" id="exampleInputPassword1"></input>
                </div>
                <button type="submit" className="btn btn-dark">Đăng nhập</button>
            </form>
         </div>    
      </section>
    </div> );
}

export default Register;