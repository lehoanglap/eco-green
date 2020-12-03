$(document).ready(function () {

  
  var hours = new Date();
  var get_hours= hours.getHours();
   var morning= get_hours >= 0 && get_hours<= 12;
   var afternoon=get_hours > 12 && get_hours <= 18;
   var evening=get_hours > 18 && get_hours <=23

   
  
   
  
  if (morning == true) {
    $("#come").text("Good morning!!");


    
  }

  else{
    if (afternoon==true) {
      $("#come").text("Good afternoon!!");
  
      
    }
    else{
      if (evening==true) {
        $("#come").text("Good evening!!");
    
        
      }

    }

  }

  

  



  var firebaseConfig = {
    apiKey: "AIzaSyDoKf2XHogYOzFCkZGRDyi0Ath8Uuk0CDk",
    authDomain: "quickstart-1560498993739.firebaseapp.com",
    databaseURL: "https://quickstart-1560498993739.firebaseio.com",
    projectId: "quickstart-1560498993739",
    storageBucket: "quickstart-1560498993739.appspot.com",
    messagingSenderId: "36642984237",
    appId: "1:36642984237:web:7f9bd1b246414a180003a4"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $("#hide").removeClass('hide_hide');
      
      
      
    } else {
      window.location.href='../../index.html';
    }
  });
  

  
  //   read data firebase
  //////////////////////////////////////
  var database = firebase.database();
  var data_read_base = database.ref('data_realtime');
  data_read_base.on('value', function (snapshot) {
    //su ly du lieu nhan ve
    var data_firebase_big = snapshot.val();
    //console.log(data_firebase_big); //du lieu tong
    var check_erro = data_firebase_big.check_erro;
    var moi_truong = data_firebase_big.moi_truong;
    var setting = data_firebase_big.setting;

    //check erro
    var cam_bien_am_dat = check_erro.cam_bien_am_dat; //check cảm biến độ ẩm đất
    var cam_bien_cuong_do_anh_sang = check_erro.cam_bien_cuong_do_anh_sang; //check cảm biến cường độ ánh sáng
    var cam_bien_khoang_cach = check_erro.cam_bien_khoang_cach; //check cảm biến khoảng cách
    var cam_bien_nhiet_do_do_am = check_erro.cam_bien_nhiet_do_do_am; // check cảm biến nhiệt độ độ ẩm
    var led_rgb = check_erro.led_rgb; //check led
    var may_bom = check_erro.may_bom; //check máy bơm
    var trang_thai_led_rgb = check_erro.trang_thai_led_rgb; //xác định trạng thái bật tắt của led
    var trang_thai_may_bom = check_erro.trang_thai_may_bom; //xác định trạng thái bật tắt của máy bơm
    var trang_thai_online = check_erro.trang_thai_online; //trạng thái kết nối cơ sở dử liệu

    //trang thai moi truong
    var cuong_do_anh_sang = moi_truong.cuong_do_anh_sang; //cường độ ánh sáng
    var do_am_dat = moi_truong.do_am_dat; //độ ẩm trong đất
    var do_am_khong_khi = moi_truong.do_am_khong_khi; //độ ẩm không khí
    var muc_nuoc = moi_truong.muc_nuoc; // mức nước trong bình chứa
    var nhiet_do = moi_truong.nhiet_do; //nhiệt độ môi trường

    //setting
    var anh_sang = setting.anh_sang; //lấy giá trị mã màu
    var reb = anh_sang.color.reb; //lấy thông số màu đỏ
    var green = anh_sang.color.green; //lấy thông số mầu xanh lá cây
    var blu = anh_sang.color.blu; //lấy thông số màu xanh nước biển
    var opaciti = anh_sang.color.opaciti; //lấy thông số đậm nhạt của màu
    var ligh_min = anh_sang.min; //lấy cuờng độ ánh sáng bé nhất để bật led
    var do_am_dat_min = setting.do_am_dat.min; //lấy giá trị bé nhất của đất
    var do_am_dat_max = setting.do_am_dat.max; //lấy giá trị lớn nhất của đất
    var muc_nuoc_min = setting.muc_nuoc; //lấy giá trị mục nước

    //kiểm tra trạng thái kết nối
    $("#check").click(function (e) {
      e.preventDefault();
      switch (trang_thai_online) {
        case 1:
          // trang thái online
          $("#trang_thai").html('Trạng thái kết nối <span id="check" type="button" class="btn btn-success">Online</span>');
          break;
        case 0:
          // trang thái offline
          $("#trang_thai").html('Trạng thái kết nối <span id="check" type="button" class="btn btn-danger">Offline</span>');
          break;
        default:
          // code block
      }


    });


    //dữ liệu theo dõi
    $("#nhiet_do").text(nhiet_do + '°C'); //in ra dữ liệu nhiệt độ tức thời
    $("#do_am").text(do_am_khong_khi + '%'); //in ra dữ liệu độ ẩm không khí tức thời
    $("#do_am_dat").text(do_am_dat + '%'); //in ra dữ liệu độ ẩm đất tức thời
    $("#do_am_dat_min").text(do_am_dat_min + '%'); //in ra giới hạn độ ẩm đất min
    $("#do_am_dat_max").text(do_am_dat_max + '%'); //in ra giới hạn độ ẩm đất max
    $("#cuong_do_anh_sang").text(cuong_do_anh_sang + 'lux'); //in ra dữ liệu cường độ ánh sáng tức thời
    $("#cuong_do_as_min").text(ligh_min + 'lux'); //in ra dữ liệu cường độ ánh sáng min
    $("#ma_mau_ap_dung").text('rgba(' + reb + ',' + green + ',' + blu + ',' + opaciti + ')'); //in ra dữ liệu cường độ ánh sáng min
    $("#muc_nuoc").text(muc_nuoc + '%'); //lấy giá trị còn lại trong bình
    $("#muc_nuoc_min").text(muc_nuoc_min + '%'); //lấy giá trị còn lại trong bình

    //check erro hệ thống
    //0-lỗi
    //1-tốt
    //trạng thái của led rgb

    switch (trang_thai_led_rgb) {
      case 0:
        $("#check_trang_thai_rgb").html('<p>Led RGB <samp style="width: 50px;" class="btn btn-danger ">OFF</samp></p>');
        
        break;
      case 1:
        $("#check_trang_thai_rgb").html('<p>Led RGB <samp style="width: 50px;" class="btn btn-success "> ON </samp></p>');
        
        break;
    
      default:
        break;
    }
    //trạng thái của máy bơm
    switch (trang_thai_may_bom) {
      case 0:
        $("#check_trang_thai_may_bom").html('<p>Máy bơm <samp style="width: 50px;" class="btn btn-danger ">OFF</samp></p>');
        
        break;
      case 1:
        $("#check_trang_thai_may_bom").html('<p>Máy bơm <samp style="width: 50px;" class="btn btn-success "> ON</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error cảm biến nhiệt độ độ ẩm môi trường
    switch (cam_bien_nhiet_do_do_am) {
      case 0:
        $("#check_nhiet_do_do_am").html('<p>Cảm biến nhiệt độ độ ẩm môi trường <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_nhiet_do_do_am").html('<p>Cảm biến nhiệt độ độ ẩm môi trường <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error cảm biến độ ẩm đất
    switch (cam_bien_am_dat) {
      case 0:
        $("#check_do_am_dat").html('<p>Cảm biến độ ẩm đất <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_do_am_dat").html('<p>Cảm biến độ ẩm đất <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error led rgb
    switch (led_rgb) {
      case 0:
        $("#check_rgb_led").html('<p>LED RGB <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_rgb_led").html('<p>LED RGB <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error Cảm biến cường độ ánh sáng
    switch (cam_bien_cuong_do_anh_sang) {
      case 0:
        $("#check_cam_bien_cuong_do_as").html('<p>Cảm biến cường độ ánh sáng <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_cam_bien_cuong_do_as").html('<p>Cảm biến cường độ ánh sáng <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error Cảm biến khoảng cách
    switch (cam_bien_khoang_cach) {
      case 0:
        $("#check_cam_bien_khoang_cach").html('<p>Cảm biến khoảng cách <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_cam_bien_khoang_cach").html('<p>Cảm biến khoảng cách <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }

    //check error may bơm
    switch (may_bom) {
      case 0:
        $("#check_may_bom").html('<p>Máy bơm <samp style="width: 50px;" class="btn btn-danger ">Err</samp></p>');
        
        break;
      case 1:
        $("#check_may_bom").html('<p>Máy bơm <samp style="width: 50px;" class="btn btn-success "> OK</samp></p>');
        
        break;
    
      default:
        break;
    }







    ///////////////////////////////////
  });
  // code pickr
  var data_setting = {
    color: [],
    do_am_dat_min_max: [],
    anh_sang_min: [],
    muc_nuoc_min: []


  };

  const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    default: '#ffffff',

    swatches: [
      'rgba(244, 67, 54, 1)',
      'rgba(233, 30, 99, 0.95)',
      'rgba(156, 39, 176, 0.9)',
      'rgba(103, 58, 183, 0.85)',
      'rgba(63, 81, 181, 0.8)',
      'rgba(33, 150, 243, 0.75)',
      'rgba(3, 169, 244, 0.7)',
      'rgba(0, 188, 212, 0.7)',
      'rgba(0, 150, 136, 0.75)',
      'rgba(76, 175, 80, 0.8)',
      'rgba(139, 195, 74, 0.85)',
      'rgba(205, 220, 57, 0.9)',
      'rgba(255, 235, 59, 0.95)',
      'rgba(255, 193, 7, 1)'
    ],

    components: {

      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true
      }
    }
  });

  pickr.on('save', (color) => {
    var color_led = color.toRGBA() //láy mã màu
    data_setting.color = color_led;


  })



  // click truyen data
  $(".sldl1").click(function (e) {
    // code su ly gui data
    e.preventDefault();
    var do_am_dat_min = Number($("#data1").val());
    var do_am_dat_max = Number($("#data2").val());
    var anh_sang_min = Number($("#data3").val());
    var muc_nuoc_min = Number($("#data4").val());
    // update
    var do_am_dat = [do_am_dat_min, do_am_dat_max];
    data_setting.do_am_dat_min_max = do_am_dat;
    data_setting.anh_sang_min = anh_sang_min;
    data_setting.muc_nuoc_min = muc_nuoc_min;

    //Math.round(data_setting.color[2] * 100) / 100.
    console.log(data_setting);
    var do_am_dat_min_input = data_setting.do_am_dat_min_max[0]; //lấy form input độ ảm đất min
    var do_am_dat_max_input = data_setting.do_am_dat_min_max[1]; //lấy form input độ ảm đất max
    var anh_sang_min_input = data_setting.anh_sang_min; //lấy giá trị form input cường độ ánh sáng min
    var color_input = data_setting.color;//mã màu input
    var color_reb_input = Math.round(data_setting.color[0] * 100) / 100; //lấy giá trị màu đỏ input
    var color_green_input = Math.round(data_setting.color[1] * 100) / 100; //lấy giá trị màu xanh lá cây input
    var color_blu_input = Math.round(data_setting.color[2] * 100) / 100; //lấy giá trị màu xanh nước biển input
    var color_opaciti_input = data_setting.color[3]; //lấy giá trị đậm nhạt của màu input
    var muc_nuoc_min_input = data_setting.muc_nuoc_min; //lấy giá trị mực nước min input

    var data_input_update = [do_am_dat_min_input, do_am_dat_max_input, anh_sang_min_input, color_input, color_reb_input, color_green_input, color_blu_input, color_opaciti_input, muc_nuoc_min_input]; //tạo array chứa data update

    

    


    if (data_input_update[0] != 0) {
      firebase.database().ref('data_realtime/setting/do_am_dat').update({
        min: data_input_update[0]

      },function(error) {
        if (error) {
          // The write failed...
          $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
          
        } else {
          $(".alert-success").removeClass("hide");

            setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000)
        }
      })
    }

    if (data_input_update[1] != 0) {
      firebase.database().ref('data_realtime/setting/do_am_dat').update({
        max: data_input_update[1]

      },function(error) {
        if (error) {
          // The write failed...
          $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
        } else {
          $(".alert-success").removeClass("hide");

            setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000)
        }
      })
    }

    if (data_input_update[2] != 0) {
      firebase.database().ref('data_realtime/setting/anh_sang').update({
        min: data_input_update[2]

      },function(error) {
        if (error) {
          // The write failed...
          $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
        } else {
          $(".alert-success").removeClass("hide");

            setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000)
        }
      })
    }

    if (data_input_update[3] != "") {
      $("#color_set").html('Mã <samp >rgba('+color_reb_input+','+color_green_input+','+color_blu_input+','+color_opaciti_input+')</samp>');
      firebase.database().ref('data_realtime/setting/anh_sang/color').update({
        reb:data_input_update[4],
        green:data_input_update[5],
        blu:data_input_update[6],
        opaciti:data_input_update[7]
        

      },function(error) {
        if (error) {
          // The write failed...
          $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
        } else {
          $(".alert-success").removeClass("hide");

            setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000)
        }
      })
    }

    if (data_input_update[8] != 0) {
      firebase.database().ref('data_realtime/setting/').update({
        muc_nuoc: data_input_update[8]

      },function(error) {
        if (error) {
          // The write failed...
          $(".alert-danger").removeClass("hide");

            setTimeout(function() {
                $(".alert-danger").addClass('hide');
            }, 3000)
        } else {
          $(".alert-success").removeClass("hide");

            setTimeout(function() {
                $(".alert-success").addClass('hide');
            }, 3000)
        }
      })
    }


    //update data firebase

    //kiểm tra trạng thái đăng nhập
    



    // code su ly gui data
  });





  //đăng suất
  $("#logout").click(function (e) { 
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      window.location.href='../../index.html'
    }).catch(function(error) {
      window.alert("Quá trình đăng suất lỗi!")
    });
    
  });
// --------------END CODE--------------
});