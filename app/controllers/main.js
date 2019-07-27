// lấy danh sách người dùng

var nguoiDungService = new NguoiDungService();

function getEle(id) {
    return document.getElementById(id);
}
var mangNguoiDung = [];
$(document).ready(function() {

    var ajaxNguoiDung = nguoiDungService.LayDanhSachNguoiDung();
    ajaxNguoiDung
        .done(function(result) {
            mangNguoiDung = result;
            console.log(mangNguoiDung);
            // luu vao local store
            LuuDuLieu(mangNguoiDung);
            HienThi(mangNguoiDung);

        })
        .fail(function(err) {

            console.log(err);
        })



})

function HienThi(mangHienThi) {
    var tableDanhSach = $("#tblDanhSachNguoiDung")

    var content = "";

    mangHienThi.map(function(nguoiDung, index) {
        content += `
        <tr>
        <td>${index+1}</td>
          <td>${nguoiDung.TaiKhoan}</td>
          <td>${nguoiDung.MatKhau}</td>
          <td>${nguoiDung.HoTen}</td>
          <td>${nguoiDung.Email}</td>
          <td>${nguoiDung.SoDT}</td>
          <td>"
          <button class="btn btn-danger btnXoa" data-id="${nguoiDung.TaiKhoan}">Xóa</button>
          </td>           
        </tr>
      `
    })
    tableDanhSach.html(content);
}

function LuuDuLieu(mangNguoiDung) {
    // Chuyen kieu du lieu ve kieu chuoi JSON
    var jsonData = JSON.stringify(mangNguoiDung);
    // Luu du lieu vao local storage
    localStorage.setItem("DSND", jsonData);
}


$("#btnThemNguoiDung").click(function() {
    $("#modal-title").html("Thêm người dùng");
    var btn = `
    <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
    `;
    $("#modal-footer").html(btn);
})

$("body").delegate("#btnThem", "click", function() {

    // console.log("run");
    //lay thong tin
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var maLoai = $("#maLoaiNguoiDung").val();

    //Tao doi tuong
    var nguoiDung = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoai);
    // them vao database API 


    nguoiDungService.ThemNguoiDung(nguoiDung)
        .done(function(result) {
            //location.reload();
        })
        .fail(function(err) {
            console.log(err);
        });
})

//Xoa Người Dùng
$("body").delegate(".btnXoa", "click", function() {
    var taiKhoan = $(this).data("id");
    nguoiDungService.XoanguoiDung(taiKhoan)
        .done(function() {
            location.reload();
        })
        .fail(function(err) {
            console.log(err)
        })

})