// Initialize your app
var myApp = new Framework7({
        modalTitle: 'chatPic',
        material: true
        // pushState : true
    });

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
//$$(document).on('ajaxStart', function (e) {
//    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
//        // Don't show preloader for autocomplete demo requests
//        return;
//    }
//    myApp.showIndicator();
//});
//$$(document).on('ajaxComplete', function (e) {
//    if (e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
//        // Don't show preloader for autocomplete demo requests
//        return;
//    }
//    myApp.hideIndicator();
//});


myApp.onPageInit('index', function(page){

    //login
    $$("#login").click(function(e){
        e.preventDefault();
        var username = $$("#username").val();
        var password = $$("#password").val();
        // console.log(username);

        if(username == ""){
            myApp.alert('<span class="text-size">Kindly enter your username and try again!</span>');
        }else{
            if(password == ""){
                myApp.alert('<span class="text-size">Kindly enter your password and try again!</span>');
            }else{
                $$.ajax({
                    url : 'http://picturebank.allskynews.com.ng/api.php',
                    type : 'post',
                    dataType : 'json',
                    crossDomain : true,
                    cache : false,
                    timeout : 3000,
                    data : {
                        'login' : true,
                        'username' : username,
                        'password' : password
                    },
                    success : function(data){
                        //console.log(data);
                        var err = data.error;
                        var result = data.result;
                        if (err == 0) {
                            myApp.alert('<span class="text-size">'+data.msg+'</span>');
                        }else{
                            myApp.showPreloader("Please wait...");
                            setTimeout(function(){
                                 myApp.hidePreloader();
                            }, 500);
                            $$(".cookies").click();
                            sessionStorage.setItem('id', result.id);
                            localStorage.setItem('id', result.id);
                            //localStorage.setItem('username', result.username);
                            //localStorage.setItem('fname', result.fname);
                            //localStorage.setItem('email', result.email);
                            //localStorage.setItem('phone', result.phone);
                            //localStorage.setItem('upl', result.upl);
                        }
                    },
                    error : function(error){
                        //console.log(data);
                        myApp.alert("No internet connection");
                    }
                });
            }
        }
        return false;
    });

    // online user
    var online_user_id = sessionStorage.getItem('id');
    var offline_user_id = localStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?active_online_user='+online_user_id,
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        data : {
            'online_user_id' : online_user_id,
            'offline_user_id' : offline_user_id
        },
        success : function(data){
            //console.log(data);
        },
        error : function(error){
           // console.log(error);
        }
    });

    /*for(var ii =0; ii < mainView.history.length; ii++){
        if(mainView.history[ii] === 'index.html' ) mainView.history.splice(ii, 1);
    }
    $$(".view-main .page-on-left, .view-main .navbar-on-left").remove();*/


    //var username = localStorage.getItem('username');
    //if(username == true){
    //    $$(".message").click();
    //}

}).trigger();

myApp.onPageInit('cookies', function(page){
    var id = localStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?user_profile='+id,
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        success : function(data){
            //console.log(data);
            var result = data.result;
            var id = result.id;
            var upl = result.upl;
            var username = result.username;
            var email = result.email;
             var user_profile_data = '<div class="row">'+
                                           '<div class="col-20">'+
                                                '<img src="image/'+upl+'" style="width:100%; border-radius:50%; position:relative; margin-bottom:20px; margin-bottom:20px;">'
                                           +'</div>'+
                                           '<div class="col-80">'+
                                                '<span>'+username+'</span>'+
                                                '<p>'+email+'</p>'
                                           +'</div>' 
                                        +'</div>';
                 $$(".user-profile-data").append(user_profile_data);
                 //console.log(user_profile_data);   
            
        },
        error : function(error){
            //console.log(error);
            myApp.alert('No internet connection');
        }
    });

    $$("#accept").click(function(e){
        var id = localStorage.getItem('id');
        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?user_profile='+id,
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            timeout : 3000,
            success : function(data){
                //console.log(data);
                var result = data.result;
                myApp.showPreloader("Signed In...");
                    setTimeout(function(){
                    myApp.hidePreloader();
                }, 500);
            $$(".message").click();
            localStorage.setItem('username', result.username);
            localStorage.setItem('fname', result.fname);
            localStorage.setItem('email', result.email);
            localStorage.setItem('phone', result.phone);
            localStorage.setItem('keep-me-in', 1);
            },
            error : function(error){
                //console.log(error);
                myApp.alert('No internet connecttion');
            }
        });
    });

    $$("#not-now").click(function(e){
         myApp.showPreloader("Signed In...");
                setTimeout(function(){
                myApp.hidePreloader();
            }, 500);
        $$(".message").click();
    });
});

myApp.onPageInit('account', function(page){
    $$("#ok-register").click(function(e){
        e.preventDefault();

        var username,password,cpassword,fname,gender,birth,email,phone,str;

        username = $$("#acct-username").val();
        fname = $$("#acct-fname").val();
        password = $$("#acct-password").val();
        cpassword = $$("#acct-cpassword").val();
        gender = $$("#acct-gender").val();
        birth = $$("#acct-birth").val();
        email = $$("#acct-email").val();
        phone = $$("#acct-phone").val();

       if(username == "" || password == "" || cpassword == "" || fname == "" || gender == "" || birth == "" || email == "" || phone == ""){
           myApp.alert('<span>Please fill all the fields</span>');
       }else{
           if((username.length < 5) || (username.length > 15)){
               myApp.alert('<span>Invalid username entered, it must be between 5 and 15 characters!</span>');
           }else{
               if((email.length < 10) || (email.length > 100)){
                   myApp.alert('<span>Invalid email address entered, it must be between 10 and 100 characters!</span>');
               }else{
                   if((phone.length != 11 )){
                       myApp.alert('<span>Invalid phone number, it should be 11 digit number</span>');
                   }else{
                       if((fname.length < 10) || (fname.length > 30)){
                           myApp.alert('<span>Invalid full name entered, it must be between 10 and 30 characters!</span>');
                       }else{
                           $$.ajax({
                               url : 'http://picturebank.allskynews.com.ng/api.php',
                               type : 'post',
                               dataType : 'json',
                               crossDomain : true,
                               cache : false,
                               data : {
                                   'ok-register' : true,
                                   'acct-username' : username,
                                   'acct-fname' : fname,
                                   'acct-password' : password,
                                   'acct-cpassword' : cpassword,
                                   'acct-gender' : gender,
                                   'acct-birth' : birth,
                                   'acct-email' : email,
                                   'acct-phone' : phone
                               },
                               timeout : 3000,
                               success : function(data){
                                   //console.log(data);
                                   var err = data.error;
                                   var msg = data.msg;
                                   var id= data.id;
                                   if(err == 0){
                                       myApp.alert(msg);
                                   }else{
                                       myApp.showPreloader("Please wait...");
                                       setTimeout(function(){
                                           myApp.hidePreloader();
                                       }, 600);
                                       myApp.alert(msg);
                                       localStorage.setItem('id', id);
                                       $$(".upload").click();
                                   }
                               },
                               error : function (error) {
                                   console.log(error);
                               }
                           });
                       }
                   }
               }
           }
       }

    });
});

myApp.onPageInit('upload', function(page){
    var id = localStorage.getItem('id');
    $("#upload").JSAjaxFileUploader({
        uploadUrl : 'upload_profile.php',
        autoSubmit:false,
        uploadTest:'Upload',
        inputText:'Browse...',
        fileName:'upl',
        maxFileSize:1045504,	//Max 500 KB file
        allowExt: 'jpg|jpeg|png',	//allowing only images for upload,
        zoomPreview:true,
        zoomWidth:360,
        zoomHeight:360,
        syncUploads: true,
        formData:{'id' : id},
        closeAnimationSpeed: 1000, //In milli seconds 1000 ms = 1 second
        success : function(data){
            //console.log(data);
           //myApp.alert(data.msg);
             myApp.showPreloader("Please wait...");
                setTimeout(function(){
                myApp.hidePreloader();
            }, 600);
           myApp.alert('Account created successfully, try to login');
           $$(".login").click();
           localStorage.removeItem('id');
        },
        error : function(error) {
            console.log(error);
        }
    });
});

myApp.onPageInit('forget', function(page){
    $$("#ok-forget").click(function(e){
        e.preventDefault();
        var users = $$("#users").val();

        if (users == "") {
            myApp.alert('<span class="text-size">Kindly enter your username and try again!</span>');
        }

        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php',
            type : 'post',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            timeout : 3000,
            data : {
                'ok-forget' : true,
                'users' : users
            },
            success : function(data){
                //console.log(data);
                var err = data.error;
                var result = data.result;
                if (err == 0) {
                    myApp.alert('<span class="text-size">'+data.msg+'</span>');
                }else{
                    myApp.showPreloader("Please wait...");
                    setTimeout(function(){
                        myApp.hidePreloader();
                    }, 500);
                    $$(".forget-password").click();
                    localStorage.setItem('id', result.id);
                }
            },
            error : function(error){
                //console.log(error);
                myApp.alert("No internet connection");
            }
        });
        return false;
    });
});

myApp.onPageInit('forget-password', function(page){
    $$("#ok-forget-password").click(function(e){
       e.preventDefault();

       //var old = $$("#old").val();
       var new_pass = $$("#new").val();
       var cp = $$("#cp").val();
       var id = localStorage.getItem('id');

        if (new_pass == "") {
            myApp.alert('<span class="text-size">Your new password is required</span>')
        }else{
            if (cp == "") {
                myApp.alert('<span class="text-size">Your confirm password is required</span>')
            }
        }

        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php',
            type : 'post',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            data : {
                'ok-forget-password' : true,
                //'old' : old,
                'new_pass' : new_pass,
                'cp' : cp,
                'id' : id
            },
            timeout : 3000,
            success : function (data) {
                console.log(data);
                var err = data.error;
                if(err == 0){
                    myApp.alert('<span class="text-size">'+data.msg+'</span>');
                }else{
                    myApp.showPreloader('<span class="text-size">'+data.msg+'</span>');
                    setTimeout(function(){
                        myApp.hidePreloader();
                    }, 700);
                    localStorage.removeItem('id');
                    $$('.login').click();
                }
            },
            error : function(error){
                //console.log(error);
                myApp.alert("No internet connection");
            }
        });
    });

});

myApp.onPageInit('search', function(page){

});

myApp.onPageInit('profile', function(page){
    
});

myApp.onPageInit('group-detail-info', function(page){

    if(page.name === 'group-detail-info'){
        var id = page.query.group_detail_info;
        //console.log(id);
        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?group_detail_info='+id,
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            success : function (data) {
                //console.log(data);
                var group_details_info = data;
                for(var ii =0; ii < group_details_info.length; ii++){

                    var user_group_id = group_details_info[ii].user_group_id;
                    var user_group_fname = group_details_info[ii].user_group_fname;
                    var total_group_user = group_details_info[ii].total_group_user;
                    var group_id = group_details_info[ii].group_id;
                    var group_name = group_details_info[ii].group_name;
                    var user_group_username = group_details_info[ii].user_group_username;
                    var group_upl = group_details_info[ii].group_upl;
                    var admin_group_id = group_details_info[ii].admin_group_id;
                    var user_group_upl = group_details_info[ii].user_group_upl;
                    var add_time = group_details_info[ii].add_time;

                    //console.log(admin_group_id);

                    var list_all_group_user = '<li>'+
                                                '<a href="#" class="item-link item-content">'+
                                                    '<div class="item-media"><img src="image/'+user_group_upl+'" style="width:30px; height:30px;"></div>'+
                                                    '<div class="item-inner">'+
                                                       '<div class="item-title-row text-capitalize">'+
                                                            '<div class="item-title">'+user_group_fname+'</div>'+
                                                            '<div class="item-after" style="font-size:13px;"> '+add_time+'</div>'
                                                        +'</div>'
                                                    +'</div>'
                                                +'</a>'
                                             +'</li>';
                    $$(".list-all-group-user").append(list_all_group_user);

                }

                $$('.total-group-user').append(total_group_user + ' All participants');
                var group_info = '<a href="group-message.html?id='+group_id+'" class="link icon-only"><i class="icon icon-back"></i></a> <img src="image/'+group_upl+'" class="img-circle-rounded" style="margin-bottom:10px;"> <span class="group-detail-info" style="margin-left: 20px; margin-top: 10px;">'+group_name+'</span>';
                $$(".group-details-info").append(group_info);
                var add_new_group_users = '<a href="add_new_group_user.html?add_new='+id+'" class="floating-button color-blue"><i class="material-icons">people_outline</i></a>';
                $$(".add-new-group-users").append(add_new_group_users);
                var report ='<div class="buttons-row"><a href="#" id="exit" class="button color-red">Exit Group</a><a href="report-group.html?group_id='+group_id+'" class="button color-red"> Report Group</a></div>';
                $$(".report").append(report);
                var group_notification = '<li><a href="group-notification.html?group_notify='+group_id+'" class="item-link item-content">'+
                                            '<div class="item-media"><i class="material-icons text-blue">notifications</i></div>'+
                                            '<div class="item-inner">'+
                                                '<div class="item-title">Notification</div>'+
                                            '</div>'+
                                        '</a></li>';

                $$(".notification").append(group_notification);

                $$("#exit").click(function(){
                    var user_group_id = sessionStorage.getItem('id');
                    //var group_id = group_id;
                    $$.ajax({
                        url : 'http://picturebank.allskynews.com.ng/api.php?exit-group',
                        type : 'get',
                        dataType : 'json',
                        crossDomain : true,
                        cache : false,
                        timeout : 3000,
                        data : {
                            'exit-group' : true,
                            'user_group_id' : user_group_id,
                            'group_id' : group_id
                        },
                        success : function(data){
                            //console.log(data);
                            var result = data.result;
                            myApp.showPreloader("Please wait...");
                            setTimeout(function(){
                                myApp.hidePreloader();
                            }, 500);
                            $$(".message").click();
                            myApp.alert('<span class="text-size"> You have been exit from "'+result.group_name+'" group</span>');
                        },
                        error : function(error){
                            console.log(error);
                        }
                    });
                });
            },
            error : function(error){
                //console.log(error);
                myApp.alert("No internet connection");
            }
        });
    }

});

myApp.onPageInit('message', function(page){

    var current_user_id = sessionStorage.getItem('id');
    var fname = localStorage.getItem('fname');
    $$(".msg").append(fname);
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?active',
        type : 'get',
        dataType : 'json',
        crossDoman : true,
        cache : false,
        timeout : 3000,
        data : {
            'current_user_id' : current_user_id
        },
        success : function (data) {
            //console.log(data);
            var result = data;
             for(var ii =0; ii < result.length; ii++){
                var id = result[ii].id;
                var username = result[ii].username;
                var fname = result[ii].fname;
                var upl = result[ii].upl;
                var add_date = result[ii].add_date;

                var active_friend_list = '<li>'+
                                            '<a href="chat.html?active_id='+id+'" class="item-link item-content">'+
                                                '<div class="item-media"><img src="image/'+upl+'" class="img-circle-rounded"><span class="online-user"><i class="material-icons">check</i></span></div>'+
                                                  '<div class="item-inner">'+
                                                    '<div class="item-title-row">'+
                                                        '<div class="item-title group-name">'+
                                                            '<p style="font-size: 12px;">'+fname+'</p>'+
                                                            '<p style="font-size: 12px;">Now on chatPic</p>'+
                                                            '</div>'+
                                                         '<div class="item-after" style="font-size: 12px;"> Join ' +add_date+ '</div>'
                                                    +'</div>'
                                                   +'</div>'
                                            +'</a>'
                                        +'</li>';
                //console.log(active_friend_list);
                $$(".active-friend-list").append(active_friend_list);
            }
        },
        error : function (error) {
            //console.log(error);
            myApp.alert('No internet connection');
        }
    });

    var user_group_id = sessionStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?list-group',
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        data : {
            'user_group_id' : user_group_id
        },
        success : function(data){
            //console.log(data);
            var result = data;
            for(var ii =0; ii < result.length; ii++){
                var id = result[ii].id;
                var group_name = result[ii].group_name;
                var add_date = result[ii].add_date;
                var upl = result[ii].group_upl;
                var add_time = result[ii].add_time;
                var admin_group_id = result[ii].admin_group_id;

                var group_user_details = '<li>'+
                                            '<a href="group-message.html?id='+id+'" class="item-link item-content">'+
                                                '<div class="item-media"><img src="image/'+upl+'" class="img-circle"></div>'+
                                                '<div class="item-inner">'+
                                                    '<div class="item-title-row text-capitalize">'+
                                                        '<div class="item-title">'+group_name+'</div>'+
                                                        '<div class="item-after" style="font-size: 12px;">'+add_time+'</div>'
                                                    +'</div>'+
                                                    '<div class="item-subtitle text-capitalize" style="padding-top:8px; font-size:13px;">created by '+admin_group_id+'</div>'
                                                +'</div>'
                                            +'</a>'
                                        +'</li>';
                  $$(".group-name-list").append(group_user_details);
                //console.log(group_user_details);
            }
        },
        eeror : function (error) {
            console.log(error);
            //myApp.alert("No internet connection");
        }
    });

    // online user
    var online_user_id = sessionStorage.getItem('id');
    var offline_user_id = localStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?active_online_user='+online_user_id,
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        data : {
            'online_user_id' : online_user_id,
            'offline_user_id' : offline_user_id
        },
        success : function(data){
            //console.log(data);
        },
        error : function(error){
            //console.log(error);
        }
    });

    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?update_status',
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        success : function(data){
            //console.log(data);
            var result = data;
            var ii =0;
            for(ii; ii < result.length; ii++){
                var status_title_id = result[ii].status_title_id;
                var status_title = result[ii].status_title;
                var add_time = result[ii].add_time;
                var add_date = result[ii].add_date;
                var user_username = result[ii].user_username;
                var user_upl = result[ii].user_upl;
                var status_img = result[ii].status_img;
                var post_status = '<div class="card ks-facebook-card">'+
                                    '<div class="card-header">'+
                                        '<div class="ks-facebook-avatar"><img src="image/'+user_upl+'" width="34" height="34" style="border-radius:50%;"/></div>'+
                                        '<div class="ks-facebook-name text-capitalize">'+user_username+'</div>'+
                                        '<div class="ks-facebook-date">'+add_time+'</div>'
                                    +'</div>'+
                                    '<div class="card-content">'+
                                        '<div class="card-content-inner">'+
                                            '<p>'+status_title+'</p><img src="image/'+status_img+'" width="100%"/>'
                                        +'</div>'
                                    +'</div>'+
                                    '<div class="card-footer">'+
                                      '<a href="#" class="link">Like</a>'+
                                      '<a href="#" class="link">Comment</a>'
                                    +'</dliv>'
                                  +'</div>';
                  $$(".post-status").append(post_status);                
            }
        },
        error : function(error){
            console.log(error);
        }
    });
});

myApp.onPageInit('group', function(page){

    $$("#ok-group").click(function(e){
        e.preventDefault();
        var group = $$("#group").val();
        var user_id = localStorage.getItem('id');

        if(group == ""){
            myApp.alert('<span class="text-size">Kindly type a group name</span>');
        }else{
            if((group.length < 5) || (group.length > 30)){
                myApp.alert('<span class="text-size">Invalid group name entered, it must be between 5 and 20 characters!</span>');
            }else{
                $$.ajax({
                    url : 'http://picturebank.allskynews.com.ng/api.php',
                    type : 'post',
                    dataType : 'json',
                    crossDomain : true,
                    cache : false,
                    data : {
                        'ok-group' : true,
                        'group' : group,
                        'user_id' : user_id
                    },
                    timeout : 3000,
                    success : function (data) {
                        // console.log(data);
                        var err = data.error;
                        var group_name = data.group;
                        if(err == 1){
                            myApp.showPreloader('<span class="text-size">'+data.msg+'</span>');
                            setTimeout(function(){
                                myApp.hidePreloader();
                            }, 700);
                            localStorage.setItem('group_name', group_name.group_name);
                            localStorage.setItem('group_id', group_name.group_id);
                            $$(".list-group").click();
                        }
                    },
                    error : function (error) {
                        //console.log(error);
                        myApp.alert("No internet connection");
                    }
                });
            }
        }


        return false;
    });


});

myApp.onPageInit('list-group-friend', function(page){

    var group_name = localStorage.getItem('group_name');
    $$(".group-name").append(group_name);
    var current_user_id = sessionStorage.getItem('id');

    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?active',
        type : 'get',
        dataType : 'json',
        crossDoman : true,
        cache : false,
        timeout : 3000,
        data : {
            'current_user_id' : current_user_id
        },
        success : function (data) {
            console.log(data);
            var result = data;
            for(var ii =0; ii < result.length; ii++){
                var id = result[ii].id;
                var username = result[ii].username;
                var fname = result[ii].fname;
                var upl = result[ii].upl;
                var phone = result[ii].phone;
                var group_id = localStorage.getItem('group_id');

                var group_list = '<li>'+
                                    '<label class="label-checkbox item-content">'+
                                        '<input type="checkbox" name="group_id" id="group_id" value="'+group_id+'"/>'+
                                        '<input type="hidden" name="user_group_id" id="user_group_id" value="'+id+'"/>'+
                                        '<div class="item-media"><i class="icon icon-form-checkbox"></i></div>'+
                                        '<div class="media-img">'+
                                            '<img src="image/'+upl+'">'
                                        +'</div>'+
                                        '<div class="item-inner">'+
                                            '<div class="item-title group-name">'+
                                                '<p>'+fname+'</p>'+
                                                '<p>'+phone+'</p>'
                                            +'</div>'
                                        +'</div>'
                                    +'</label>'
                                +'</li>';
                //console.log(group_list);
                $$(".group-list").append(group_list);
            }
        },
        error : function (error) {
            //console.log(error);
            myApp.alert("No internet connection");
        }
    });
});

myApp.onPageInit('group-message', function(page){

    if(page.name == 'group-message'){
        var id = page.query.id;
        //console.log(id);
        $$.ajax({
          url :  'http://picturebank.allskynews.com.ng/api.php?id='+id,
          type : 'get',
          dataType : 'json',
          crossDomain : true,
          cache : false,
          success : function(data){
              //console.log(data);
              var group_result = data;
              for(var ii =0; ii < group_result.length; ii++){
                  var id = group_result[ii].group_id;
                  var group_upl = group_result[ii].group_upl;
                  var group_name = group_result[ii].group_name;

                  var group_details = '<img src="image/'+group_upl+'" class="img-circle-rounded"> <span class="text-capitalize group-detail-info">'+group_name+'</span>';
                  var group_detail_link = '<a href="group-detail-info.html?group_detail_info='+id+'" class="link icon-only"><i class="material-icons">info_outline</i></a>';
                  $$(".group-name").append(group_details);
                  $$(".group-detail-link").append(group_detail_link);
              }
          },
          error : function(error){
              //console.log(error);
              myApp.alert("No internet connection");
          }
        });
    }

    if(page.name === 'group-message'){

        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?read-group-message='+id,
            type : 'get',
            dataType : 'json',
            crossDomain: true,
            cache : false,
            timeout : 3000,
            success: function (data){
                //console.log(data);
                var result = data;
                for(var ii =0; ii < result.length; ii++){
                    var id = result[ii].length;
                    var user_group_username = result[ii].user_group_username;
                    var upl = result[ii].upl;
                    var group_message = result[ii].message; 
                    var add_group_date = result[ii].add_group_date


                }
            },
            error : function(error){
                console.log(error);
            }
        });

        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?exit-user-group='+id,
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            timeout : 3000,
            success : function(data){
                //console.log(data);
                var result = data;
                for(var ii =0; ii < result.length; ii++){
                    var username = result[ii].username;
                    var add_date = result[ii].add_date;
                    var add_time = result[ii].add_time;
                    var total_exit = result[ii].total_exit;
                    var active_group_user = result[ii].active_group_user;
                    var group_name = result[ii].group_name;

                    if(active_group_user == 0){
                        var remove = '<div class="remove-group-user">'+
                                        '<ol>'+
                                            '<li><i class="fa fa-user"></i> '+username+' > </li>'+
                                             '<li> Left " '+group_name+' " group > </li>'+
                                            '<li><i class="fa fa-clock-o"></i> '+add_time+'</li>'
                                        +'</ol>'
                                      +'</div>';
                        $$(".group-user-message").append(remove);
                    }
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }
});


myApp.onPageInit('chat', function (page) {

    if(page.name === 'chat'){
        var id = page.query.active_id;
       // console.log(id);
        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?active_id='+id,
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            success : function (data) {
                //console.log(data);
                var result = data;
                for(var ii =0; ii < result.length; ii++){
                    var id = result[ii].id;
                    var upl = result[ii].upl;
                    var username = result[ii].username;
                    var fname = result[ii].fname;
                    var online_user = result[ii].online_user;
                }
                var user_detail = '<img src="image/'+upl+'" class="img-user-circle"> <span class="text-capitalize group-detail-info">'+fname+'</span>';
                var user_link = '<span class="text-size">'+online_user+'</span> <a href="user-profile.html?active_user_id='+id+'" class="link icon-only"><i class="material-icons">info_outline</i></a>';
                $$('.user-detail').append(user_detail);
                $$('.user-link').append(user_link);

            },
            error : function(error){
                //console.log(error);
                myApp.alert('No internet connecttion');
            }
        });
    }
});

myApp.onPageInit('user-profile', function (page) {
    if(page.name === 'user-profile'){
        var id = page.query.active_user_id;
        //console.log(id);
        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?active_user_id='+id,
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            timeout : 3000,
            success : function(data){
                //console.log(data);
                var result = data;
                for(var ii =0; ii < result.length; ii++){
                    var id = result[ii].id;
                    var upl = result[ii].upl;
                    var fname = result[ii].fname;
                    var username = result[ii].username;
                    var add_date = result[ii].add_date;
                    var add_time = result[ii].add_time;
                    var online_user = result[ii].online_user
                }
                var user_detail = '<span class="group-name" style="font-size: 15px;"><img src="image/'+upl+'" class="img-user-circle"> '+fname+'</span>';
                $$('.user-detail').append(user_detail);

            },
            error : function(error){
                console.log(error);
            }
        });
    }
});

myApp.onPageInit('help', function(page){
   $$(".logout").click(function(){
     var username,fname,email,phone,id;
       username = localStorage.removeItem('username');
       fname = localStorage.removeItem('fname');
       email = localStorage.removeItem('email');
       phone = localStorage.removeItem('phone');
       id = sessionStorage.removeItem('id');
       myApp.showPreloader("Please wait...");
       setTimeout(function(){
           myApp.hidePreloader();
       }, 500);
       myApp.alert('<span class="text-size">Your are successfully logout</span>');
       $$(".login").click();
   });
});

myApp.onPageInit('friend', function(page){
    var user_id = sessionStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?user-friend',
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        data : {
            'user_id' : user_id
        },
        success : function(data){
            //console.log(data);
            var result = data;
            for(var ii =0; ii < result.length; ii++){
                var id = result[ii].id;
                var upl = result[ii].upl;
                var fname = result[ii].fname;
                var phone = result[ii].phone;
                var username = result[ii].username;
                var add_time = result[ii].add_time;

                var list_user_friends = '<li>'+
                                '<a href="#" class="item-link item-content">'+
                                    '<div class="item-media"><img src="image/'+upl+'" class="img-circle"></div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title-row text-capitalize">'+
                                            '<div class="item-title">'+fname+'</div>'+
                                            '<div class="item-after" style="font-size: 12px;">'+add_time+'</div>'
                                        +'</div>'+
                                        '<div class="item-subtitle">Beatles</div>'
                                    +'</div>'
                                +'</a>'
                            +'</li>';
                $$(".list-user-friends").append(list_user_friends);
            }


        },
        error : function(error){
            console.log(error);
        }
    });
});

myApp.onPageInit('status-title', function(page){
    var id = localStorage.getItem('id');
    $$.ajax({
        url : 'http://picturebank.allskynews.com.ng/api.php?user_profile='+id,
        type : 'get',
        dataType : 'json',
        crossDomain : true,
        cache : false,
        timeout : 3000,
        success : function(data){
            //console.log(data);
            var result = data.result;
            var id = result.id;
            var username = result.username;
            var fname = result.fname;
            var upl = result.upl;
            var add_time = result.add_time;
            var total_f = result.total;
            var email = result.email;

            var user_profile = '<div class="row no-gutter">'+
                                '<div class="col-20">'+
                                 '<img src="image/'+upl+'" style="width:50px; height:50px; border-radius:50px; position:relative; margin-left:20px;">'
                                +'</div>'+
                                '<div class="col-80">'+
                                    '<ol class="list-user">'+
                                        '<li><i class="fa fa-user-plus"></i> '+username+'</li>'+
                                        '<li><i class="fa fa-envelope"></i> '+email+'</li>'
                                    +'</ol>'
                                +'</div>'
                            +'</div>';
              $$(".user-profile").append(user_profile);              

        },
        error : function(error){
            // console.log(error);
            myApp.alert("No internet connection");
        }
    });

    $$("#post").click(function(e){
        e.preventDefault();
        //var v_post = $$("#v-post").val();
        var status_title = $$("#status-title").val();
        var id = sessionStorage.getItem('id');
        if (status_title == "") {
            myApp.alert('<span>Status title can not be empty</span>');
        }else{
            if (status_title.length < 5 ) {
                myApp.alert('<span>Invalid status title, it should be at least 5 characters</span>');
            }else{
                $$.ajax({
                    url : 'http://picturebank.allskynews.com.ng/api.php',
                    type : 'post',
                    dataType : 'json',
                    crossDomain : true,
                    cache : false,
                    data : {
                        'post' : true,
                        'id' : id,
                        'status_title' : status_title
                    },
                    timeout : 3000,
                    success : function(data){
                        //console.log(data);
                        var status_id = data.status_id;
                        localStorage.setItem('status_id', status_id.status_id);
                        myApp.showPreloader("Please wait...");
                            setTimeout(function(){
                            myApp.hidePreloader();
                        }, 600);
                        myApp.alert(data.msg);
                        $$(".upl-status").click();    
                    },
                    error : function(error){
                        //console.log(error);
                        myApp.alert("No internet connection");
                    }
                });
            }
        }
    });
});

myApp.onPageInit('upl-status', function(page){
    var id = localStorage.getItem('id');
    var status_id = localStorage.getItem('status_id');
    $('#upload-status').JSAjaxFileUploader({
        uploadUrl:'upload_status.php',
        autoSubmit:false,
        uploadTest:'Upload',
        inputText:'Browse...',
        fileName:'img',
        maxFileSize:1045504,    //Max 500 KB file
        allowExt: 'gif|jpg|jpeg|png',   //allowing only images for upload,
        zoomPreview:true,
        zoomWidth:360,
        zoomHeight:360,
        syncUploads: true,
        formData : {'user_id' : id,'status_title_id' : status_id},
        success : function(data){
            //console.log(data);
            // myApp.showPreloader("Please wait...");
            //     setTimeout(function(){
            //     myApp.hidePreloader();
            // }, 600);
           myApp.alert('Status update successfully');
           $$(".message").click();
           localStorage.removeItem('status_id');
        },
        error : function(error) {
            // console.log(error);
            myApp.alert("No internet connection");
        }
    });
});

myApp.onPageInit('add_new_group_user', function(page){
    if(page.name === 'add_new_group_user'){
        var group_id = page.query.add_new;
        var  user_id = sessionStorage.getItem('id');
        $$.ajax({
            url : 'http://picturebank.allskynews.com.ng/api.php?add-new-group-user',
            type : 'get',
            dataType : 'json',
            crossDomain : true,
            cache : false,
            timtout : 3000,
            data : {
                'user_id' : user_id,
                'group_id' : group_id
            },
            success : function (data) {
                //console.log(data);
                var result = data;
                for(var ii =0; ii < result.length; ii++){
                    var id = result[ii].id;
                    var fname = result[ii].fname;
                    var upl = result[ii].upl;
                    var phone = result[ii].phone;
                    var username = result[ii].username;

                    var add_participant = '<li>'+
                                            '<label class="label-checkbox item-content">'+
                                                '<input type="checkbox" name="user-group-id" id="user-group-id" value="'+id+'"/>'+
                                                '<input type="hidden" name="group-id" id="group-id" value="'+group_id+'">'+
                                                '<div class="item-media"><img src="image/'+upl+'" class="img-circle"/></div>'+
                                                    '<div class="item-inner text-capitalize">'+
                                                        '<div class="item-title-row">'+
                                                            '<div class="item-title">'+fname+'</div>'
                                                        +'</div>'+
                                                        '<div class="item-subtitle" style="-webkit-padding-after: 5px;">'+phone+'</div>'
                                                    +'</div>'+
                                            '<div class="item-after"><i class="icon icon-form-checkbox"></i></div>'
                                            +'</label>'
                                        +'</li>';
                    $$(".add-participant").append(add_participant);
                    //console.log(add_participant);
;                }
            },
            error : function (error) {
                //console.log(error);
                myApp.alert('No internet connection');
            }
        });
    }

    $$("#add-participant").click(function(e){
        e.preventDefault();
        var group_id,user_group_id;
        group_id = $$("#group-id").val();
    });
});

myApp.onPageInit('group-notification', function(page){
   if(page.name === 'group-notification'){
       var group_id = page.query.group_notify;
       //console.log(group_id);
       var back_group_notification = '<a href="group-detail-info.html?group_detail_info='+group_id+'" class="link icon-only"><i class="icon icon-back"></i></a>';
       $$(".back-notification").append(back_group_notification);
   }
});

myApp.onPageInit('add-friend', function(page){

});

myApp.onPageInit('report-group', function(page){
    if(page.name === 'report-group'){
       var group_id = page.query.group_id;
       //console.log(group_id);
       var back_group_notification = '<a href="group-detail-info.html?group_detail_info='+group_id+'" class="link icon-only"><i class="icon icon-back"></i></a>';
       $$(".back-notification").append(back_group_notification);
   }
});