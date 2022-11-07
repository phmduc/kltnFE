export const validation = {
  validateName: function (name) {
    if (!name || name === "") {
      return "Tên không được bỏ trống (*)";
    } else return true;
  },
  validateEmail: function (name) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!name || name === "") {
      return "Phần này không được bỏ trống (*)";
    } else if (!name.match(mailformat)) {
      return "Email không hợp lệ (*)";
    } else {
      return true;
    }
  },
  validatePrice: function (name) {
    if (!name || name === 0) {
      return "Giá không được bỏ trống";
    } else if (Number(name) < 0 || Number.isInteger(Number(name)) === false) {
      return "Giá không hợp lệ";
    } else {
      return true;
    }
  },
  validateCate: function (name) {
    console.log(name);
    if (!name || name == 0) {
      return "Phần này không được bỏ trống (*)";
    } else {
      return true;
    }
  },
  validateSizeId: function (name) {
    if (!name || name.length === "") {
      return "Mã size không được trống";
    } else {
      return true;
    }
  },
  validateCount: function (name) {
    if (Number(name) < 0 || Number.isInteger(Number(name)) === false) {
      return "Không hợp lệ";
    } else {
      return true;
    }
  },
  validateSize: function (name) {
    if (!name || name.length === 0) {
      return "Thêm ít nhất 1 Size cho sản phẩm (*)";
    } else {
      return true;
    }
  },
  validateSize: function (password) {
    if (!password || password.length === 0) {
      return "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      return "Mật khẩu phải ít nhất 6 ký tự";
    } else {
      return true;
    }
  },
};
