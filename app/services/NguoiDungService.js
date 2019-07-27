function NguoiDungService() {
    // lấy danh sách ngươi dùng từ back end về 
    this.LayDanhSachNguoiDung = function() {
            return $.ajax({
                url: "http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
                type: "GET"
            })

        }
        // them người dùng
    this.ThemNguoiDung = function(nguoiDungMoi) {
        return $.ajax({
            url: "http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung",
            type: "POST",
            data: nguoiDungMoi
        })

    }

    // Xóa người dùng
    this.XoanguoiDung = function(id) {
        return $.ajax({

            // truyền động ID, dấu `${id}`
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`,
            type: "DELETE"

        })


    }
}