//페이지 로딩시 체크현황, DB에 있는 확장자 불러오기
$(document).ready(function(){
	var url = "http://localhost:9200/Blocking_Extensions/ajaxCon";
	$.ajax({
        type:"POST",
        url:url,
        dataType:"html",
        success : function(data){
        	data = data.split(',');
        	var rest = data.slice(14);	// 고정 확장자를 제외한 DB에 저장돼있는 확장자들
        	rest.pop();
            for(var i = 0; i < 14; i+=2){
            	var extension = data[i];
            	var checked = data[i+1];
            	if(checked == 1){
            		$('input:checkbox[id=' + extension + ']').prop("checked", true);	// 체크를 했었다면 체크된채로 호출
            	}
            }
            // 나머지 추가됐던 확장자들 박스에 출력 
            for(var i = 0; i < rest.length; i+=2){
            	var extension = rest[i];
            	$("#custom").append('<span id=' + extension + '><input type="button" class="remove" value=' + extension + '> </span>');
            	check_num();
            }
        },
        error : function(request,status,error){
            alert(e);
        }
    })
})
//체크 및 해제하기 
$(document).ready(function() { 
	$("input:checkbox").on('click', function() { 
		// 체크하기 checked = 1
		if ( $(this).prop('checked') ) { 
			var extension = $(this).val();
			var checked = 1;
            var url = "http://localhost:9200/Blocking_Extensions/ajaxCon";
            $.ajax({
                type:"GET",
                url:url,
                dataType:"html",
                data:{
                	extension : extension,
                	checked : checked
                },
                error : function(request,status,error){
                    alert(e);
                }
            })
			$(this).parent().addClass("selected");
		}
		// 체크 해제 하기 checked = 0
		else { 
			var extension = $(this).val();
			var checked = 0;
            var url = "http://localhost:9200/Blocking_Extensions/ajaxCon";
            $.ajax({
                type:"GET",
                url:url,
                dataType:"html",
                data:{
                	extension : extension,
                	checked : checked
                },
                error : function(request,status,error){
                    alert(e);
                }
            })
			$(this).parent().removeClass("selected");
		} 
		}); 
});

//확장자 추가하기
$(document).ready(function() { 
	$("#addButton").click(function(){
		AddExtension();
	})
})
function AddExtension(){
	var url = "http://localhost:9200/Blocking_Extensions/add"
	var extension = $("#custom_extension").val();
	var check_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자체크
	var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글체크
	check_num();
	// 추가된 확장자 개수 200개 이상 block
	if(num > 200){
		alert('200개 이상 추가가 불가합니다.');
	}
	// 확장자 길이 20자 이상 block
	if(extension.length > 20){
		alert('20자 이상 입력이 불가합니다.');
		empty_space();
	}
	// 특수문자나 한글 block
	else if(check_spc.test(extension) == true || check_kor.test(extension) == true){
		alert('한글이나 특수문자는 입력이 불가합니다.');
		empty_space();
	}
	else{
		$.ajax({
	        type:"GET",
	        url:url,
	        dataType:"html",
	        data:{
	        	extension : extension
	        },
	        success : function(data){
	        	// DB에서 중복체크
	        	if(data=="nope"){
	        		alert('이미 있는 확장자입니다.');
	        		empty_space();
	        	}
	        	// 중복이 아니라면 확장자 추가.
	        	else{
	        		$("#custom").append('<span id=' + extension + '><input type="button" class="remove" value=' + extension + '> </span>');	
	        		check_num();
	        		empty_space();
	        	}
	        },
	        error : function(request,status,error){
	            alert(e);
	        }
	    })
	}
	
}

//확장자 삭제하기
$(document).on("click",".remove",function(){
	var url = "http://localhost:9200/Blocking_Extensions/remove"
	var extension = $(this).val();
	var span = $('#' + extension + '');
	$.ajax({
        type:"GET",
        url:url,
        dataType:"html",
        data:{
        	extension : extension
        },
        success : function(data){
        	span.remove();
        	check_num();
        },
        error : function(request,status,error){
            alert(e);
        }
    })
})

// 추가된 확장자 개수 체크
function check_num(){
	var num = $("span").length;	// 추가된 확장자 개수 체크
	$("#num").empty();
	$("#num").append('<div>' + num + '/200</div>')
}

// 입력칸 비우기
function empty_space(){
	document.getElementById('custom_extension').value = null;
}