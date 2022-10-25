export const validation = {
  validateName: function (name) {
    if (!name || name === "") {
      return "Phần này không được bỏ trống";
    } else return true;
  },
  validateEmail: function (name) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!name || name === "") {
      return "Phần này không được bỏ trống";
    } else if (!name.match(mailformat)) {
      return "Email không hợp lệ";
    } else {
      return true;
    }
  },
  validatePrice: function (name) {
    if (!name || name === "") {
      return "Phần này không được bỏ trống";
    } else if (Number(name) < 0 || Number.isInteger(Number(name)) === false) {
      return "Giá không hợp lệ";
    } else {
      return true;
    }
  },
  validateCate: function (name) {
    if (!name || name === "") {
      return "Phần này không được bỏ trống";
    } else {
      return true;
    }
  },
  validateSize: function (name) {
    if (!name || name.length === 0) {
      return "Thêm ít nhất 1 Size cho sản phẩm";
    } else {
      return true;
    }
  },
};
