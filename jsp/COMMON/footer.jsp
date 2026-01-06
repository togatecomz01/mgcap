<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>

<iframe name="hiddenFrame" src="/jsp/blank.jsp" width="0" height="0" title="빈프레임"></iframe>
         


<script>
$(document).ready(function() {
	$('.prdt_counsel_app_info').click(function(){
		$("#prdt_counsel_app").addClass("on");
	});

	$('.prdt_counsel_app_close').click(function(){
		$("#prdt_counsel_app").removeClass("on");
	});
}); 

function familyGoFun(obj){
	
	var list = obj.value;
	var url = "";
	if(list == "1"){
		url = "https://www.kfcc.co.kr/";
	}else if(list == "2"){
		url = "https://www.mginfo.co.kr/";
	}else if(list == "3"){
		url = "http://www.mgasset.co.kr/";
	}else if(list == "4"){
		url = "https://www.mgdatasystem.co.kr/";
	}else if(list == "5"){
		url = "https://www.mgtvlive.com/";
	} 
	window.open('about:blank').location.href=url;
	 
}

</script> 
<!-- s : 일반 얼럿/컨펌 메시지 - title, subtitle 없음 -->
 
   				<!--s: 알럿모음-->
                <secition class="modal-container">
                    <div id="messagePop" class="layerPopup modal">
                        <div class="pop-content alert">
                            <div class="pop-body">
                                <p id="messageMsg"></p>
                            </div>
                            <div class="pop-footer">
                                <div class="button-content">
                                    <button type="button" class="btn-pop-primary" id="messageCloseBtn">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </secition>
                <!--e: 알럿모음-->
                
                <!--s: 컨펌-->
                <section class="modal-container">
                    <div id="confirmPop" class="layerPopup modal">
                        <div class="pop-content alert"> 
                            <div class="pop-body"> 
                                <p id="confirmMsg"></p>
                            </div>
                            <div class="pop-footer">
                                <div class="button-content">
                                    <button type="button" class="btn-pop-secondary" id="confirm_no">취소</button>
                                    <button type="button" class="btn-pop-primary" id="confirm_yes">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!--e: 알럿모음-->
<!-- e : 일반 얼럿/컨펌 메시지 - title, subtitle 없음 -->
<footer id="footerWrap" class="footer-wrap">
    <div class="footer-container">
        <div class="footer-top">
            <ul class="ft-link">
                <li><a href="javascript:goMenuFnc('회사소개','약관 및 정책','개인정보처리방침','N','/mgcap/customer/WCC60300VQ.jsp');">개인정보처리방침</a></li>
                <li><a href="javascript:goMenuFnc('회사소개','약관 및 정책','신용정보 활용체제','N','/mgcap/customer/WCC601200VQ.jsp');">신용정보 활용체제</a></li>
                <li><a href="javascript:goMenuFnc('회사소개','약관 및 정책','법적고지','N','/mgcap/customer/WCC60800VQ.jsp');">법적고지</a></li>
                <li><a href="javascript:goMenuFnc('회사소개','약관 및 정책','이용약관','N','/mgcap/customer/WCC60100VQ.jsp');">이용약관</a></li>
			
                <li><a href="javascript:goMenuFnc('제휴약정','','','N','/mgcap/customer/WCC21200VQ.jsp');">제휴약정</a></li>
 				<li><a href="javascript:goMenuFnc('법인계약약정','','','Y','/mgcap/customer/WCC21300VQ.jsp');">법인계약약정</a></li>
 			
            </ul>
            <div class="family-site">
            	<label class="sr-only" for="family">패밀리 사이트</label>
                <select name="family" required="" onchange="familyGoFun(this);" title="선택지 새창열림">
                    <option value="" disabled="" selected="">패밀리 사이트</option>
                    <option value="1">MG새마을금고</option>
                    <option value="2">MG신용정보</option>
                    <option value="3">MG자산관리</option>
                    <option value="4">MG데이터시스템</option>
                    <!-- <option value="5">MGTV</option> 2025.01.02 제외 -->
                </select>
            </div>
        </div>
    
        <div class="footer-main">
            <div class="ft-cts">
                <p>서울특별시 강남구 도산대로 306 (논현동 91-3) / 사업자등록번호 105-81-87072</p>
                <p>대표번호 1588-9688 고객상담센터 (평일 09:00 ~ 18:00)</p>
                <p class="copyright">ⓒ 2025. MG CAPITAL CO. LTD. All right reserved</p>
            </div>
            <div class="ft-logo"> 
                <a target="_blank" href="https://www.webwatch.or.kr/Situation/WA_Situation.html?MenuCD=110" title="새창열기">
                    <img class="img-wa" src="/assets/images/com/img_wa.png" alt="과학기술정보통신부  WA(WEB 접근성) 품질인증 마크, 웹와치(WebWatch) 2025.03.10 ~ 2026.03.09">
                </a>
            </div>
        </div>
    </div>
    <div id="scrollTop" class="">
        <button type="button" class="scrollUpBtn">탑버튼</button>
    </div>
</footer>
<script>
    (function () {
      var ua = navigator.userAgent;
    
      // IE11
      var isIE11 = document.documentMode === 11;
    
      // Edge Chromium 80 ~ 90
      var isOldEdge =
        ua.indexOf('Edg/') > -1 &&               // Edge만
        !/Edg\/9[1-9]\./.test(ua);                // 91 이상 제외
    
      if (isIE11 || isOldEdge) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/css/com/ie.css';
        link.id = 'iecss-test';
        head.appendChild(link);
      }
    })();
</script>

  
























<script type="text/javascript">
$(document).ready(function() {
	//makeNumericEvent($('#w_wrtr_tel2'));
	//makeNumericEvent($('#w_wrtr_tel3'));
	$('#search_gb').focus();

	if("비회원" != "비회원"){
		$("#w_wrtr_psnm_dis").val("비회원")
	}

	$(".pop-body").on("input", "input[name='w_wrtr_psnm_dis']", (e) => {
		let target = $(e.currentTarget);
		let value = target.val().trim().replace(/[^a-zA-Zㄱ-\uD7A3]/g, "");

		target.val(value);
	});

	$(".pop-body").on("input", "input[name='w_emal_dis']", (e) => {
		let target = $(e.currentTarget);
		let value = target.val().trim().replace(/[^0-9a-zA-Z]/g, "");

		target.val(value);
	});

	$(".pop-body").on("input", "input[name='w_emal_domain_dis']", (e) => {
		let target = $(e.currentTarget);
		let value = target.val().trim().replace(/[^0-9a-zA-Z.]/g, "");

		target.val(value);
	});
});	

	function consoulFun() {

		var f = document.counsel_write_form;
		 
		if( $("#search_gb").val() == "선택" ) { 
			$(".counsel_type_dis_err").addClass("error");
			$(".counsel_type_dis_err").show();
			return ;
		}else{
			$(".counsel_type_dis_err").hide();
			$(".counsel_type_dis_err").removeClass("error");
		}
		
		f.counsel_type.value = $("#search_gb").val();

		if("비회원" == "비회원"){
			$("#w_wrtr_psnm_dis").attr("readonly", false);
			if( $("#w_wrtr_psnm_dis").val() == "" ) { 
				$(".w_wrtr_psnm_dis_err").addClass("error");
				$(".w_wrtr_psnm_dis_err").show();
				$("#w_wrtr_psnm_dis").focus();
				return ; 
			}else{
				$(".w_wrtr_psnm_dis_err").hide();
				$(".w_wrtr_psnm_dis_err").removeClass("error");
			}
		}else{
			$("#w_wrtr_psnm_dis").attr("readonly", true);
			$("#w_wrtr_psnm_dis").val("비회원")
		}
		f.w_wrtr_psnm.value = $("#w_wrtr_psnm_dis").val();
		
		var nots_fixd_yn = $('input[name=nots_fixd_yn_dis]:radio:checked').val();	// 회신방법
		if(nots_fixd_yn == "P"){
			if( $("#w_wrtr_tel_dis").val().length < 11 ) { 
				$(".w_wrtr_tel_dis_err").addClass("error");
				$(".w_wrtr_tel_dis_err").show();
				$("#w_wrtr_tel_dis").focus();
				return ;
			}else{
				$(".w_wrtr_tel_dis_err").hide();
				$(".w_wrtr_tel_dis_err").removeClass("error");
			} 
			f.w_wrtr_tel1.value = $("#w_wrtr_tel_dis").val().substring(0,3);
			f.w_wrtr_tel2.value = $("#w_wrtr_tel_dis").val().substring(3,7);
			f.w_wrtr_tel3.value = $("#w_wrtr_tel_dis").val().substring(7,11);
			
		}else{ 
			var w_emal_dis_tm = $("#w_emal_dis").val();
			w_emal_dis_tm =w_emal_dis_tm.trim();
			var w_emal_domain_dis_tm = $("#w_emal_domain_dis").val();
			w_emal_domain_dis_tm =w_emal_domain_dis_tm.trim();
			
			if( w_emal_dis_tm.length < 1 ) { 
				$(".w_emal_dis_err").addClass("error");
				$(".w_emal_dis_err").show();
				$("#w_emal_dis").focus();
				return ;
			}else{
				$(".w_emal_dis_err").hide();
				$(".w_emal_dis_err").removeClass("error");
			}

			if( w_emal_domain_dis_tm.length < 1 ) { 
				$(".w_emal_dis_err").addClass("error");
				$(".w_emal_dis_err").show();
				$("#w_emal_domain_dis").focus();
				return ;
			}else{
				$(".w_emal_dis_err").hide();
				$(".w_emal_dis_err").removeClass("error");
			}
			f.w_emal.value = w_emal_dis_tm;
			f.w_emal_domain.value = w_emal_domain_dis_tm;
		}
		f.nots_fixd_yn.value = nots_fixd_yn;

		if( $("#w_title_dis").val() == "" ) { 
			$(".w_title_dis_err").addClass("error");
			$(".w_title_dis_err").show();
			$("#w_title_dis").focus();
			return ; 
		}else{
			$(".w_title_dis_err").hide();
			$(".w_title_dis_err").removeClass("error");
		}
		f.w_title.value = $("#w_title_dis").val();

		$(".w_content_dis_err").text("");
		if( $("#w_content_dis").val() == "" ) {
			$(".w_content_dis_err").text("상담하실 내용을 입력해 주세요."); 
			$(".w_content_dis_err").addClass("error");
			$(".w_content_dis_err").show();
			$("#w_content_dis").focus();
			return ; 
		}else{
			$(".w_content_dis_err").hide();
			$(".w_content_dis_err").removeClass("error");
		}
		f.w_content.value = $("#w_content_dis").val();
		var content  = f.w_content.value; 
		
		var cnsl_cntn = "[고객 상담]" + "\n";
		cnsl_cntn += "이름 : " + f.w_wrtr_psnm.value + "\n";
		cnsl_cntn += "상담구분 : " + $("#search_gb option:selected").text() + "\n";
		cnsl_cntn += "내용: " + content.replace(/\&acute/g, "") + "\n";
		if(nots_fixd_yn == "P"){
			cnsl_cntn += "회신방법 : 휴대폰\n";
			cnsl_cntn += "휴대폰 : " + f.w_wrtr_tel1.value + "-" + f.w_wrtr_tel2.value + "-" + f.w_wrtr_tel3.value;
		}else{
			cnsl_cntn += "회신방법 : 이메일\n";
			cnsl_cntn += "이  메  일 : " + f.w_emal.value + "@" + f.w_emal_domain.value + "\n";
		}
		 
		if( !byteCheck(cnsl_cntn) ) {
			$(".w_content_dis_err").text("내용은 4000byte를 초과할수 없습니다."); 
			$(".w_content_dis_err").addClass("error");
			$(".w_content_dis_err").show();
			$("#w_content_dis").focus();
			return ;
		}else{
			$(".w_content_dis_err").hide();
			$(".w_content_dis_err").removeClass("error");
		} 
		f.cnsl_cntn.value = cnsl_cntn;   
		
		if($("[name=agree_dis]").is(":checked")){ 
			$(".agree_dis_err").hide();
			$(".agree_dis_err").removeClass("error");
  			
		}else{ 
			$(".agree_dis_err").addClass("error");
			$(".agree_dis_err").show();
			$("[name=agree_dis]").focus();
			return;
		}
		$("#prdt_counsel_app").removeClass("on");
		
		confirmView("confirmPop","저장하시겠습니까?","",function(){
			progressBarFun(true);
			f.target = "ifh2";
			f.submit();  
			 	 
		}); 
	
		
	}
	 
	function clear() {
		var f = document.counsel_write_form;
		f.w_title.value =''
		f.w_content.value ='';
	}

	//byte수 체크
	function byteCheck(chkStr){
		// 입력받은 문자열을 escape() 를 이용하여 변환한다.
		// 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
		var tempEstr = escape(chkStr);
		var sIndex = 0;
		var eIndex = 0;
		var tempStr = "";
		var cnt = 0;
		var rsltVal = 0;

		// 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
		while((eIndex = tempEstr.indexOf("%u",sIndex)) >=0){// 제거할 문자열이 존재한다면
			tempStr += tempEstr.substring(sIndex,eIndex);
			sIndex = eIndex +6;
			cnt ++;
		}

		tempStr += tempEstr.substring(sIndex);
		tempStr = unescape(tempStr); //원래 문자열
		//alert("tempStr : "+tempStr);

		// 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
		rsltVal = (cnt*2) + tempStr.length;
		//alert("rsltVal : "+rsltVal);
		if(rsltVal > 4000){
			//alert("4000byte를 초과할수 없습니다.");
			return false;
		}
		return true;
	}

	function chgDomain(obj){  
		if(obj.value=="직접입력"){
			$("#w_emal_domain_dis").attr("readonly", false);
			$("#w_emal_domain_dis").val("");
			$("#w_emal_domain_dis").focus();  
		}else{ 
			$("#w_emal_domain_dis").attr("readonly", true);
			$("#w_emal_domain_dis").val(obj.value); 
		}
		/*
		var selDomain = document.getElementById("sel_domain_dis");
		
		//alert(selDomain.value);
		//선택안했을시 도메인입력란을 활성화시킨다.
		if(selDomain.value == ""){
			//alert("활성화");
			wEmalDomain.readOnly = "true";	
			wEmalDomain.value = "";	
		}else{
			//alert("비활성화");
			wEmalDomain.readOnly = "false";	
			wEmalDomain.value = selDomain.value;
		}
		*/
	}

	function errorClearFun(obj){ 
		if(obj.value == "선택"){
			$(".counsel_type_dis_err").addClass("error");
			$(".counsel_type_dis_err").show();
		}else{
			$(".counsel_type_dis_err").hide();
			$(".counsel_type_dis_err").removeClass("error");
		}
	}

	$(document).ready(function() {
		
		$('.nots_fixd_yn_dis_pe').click(function(){ 
			if(this.value=="P"){
				$(".retrun_dis_p").show();
				$(".retrun_dis_e").hide(); 
			}else{
				$(".retrun_dis_p").hide();
				$(".retrun_dis_e").show(); 
			}
		});

		$('#agree_dis').click(function(){ 
			if($("[name=agree_dis]").is(":checked")){ 
				$(".agree_dis_err").hide();
				$(".agree_dis_err").removeClass("error");
				
				$('.info_read').each(function(){

				  this.scrollIntoView(true);

				});
				
			}
		});
		
	}); 

	function reloadMainFun(msg,target){ 
		messageView("messagePop",msg,"",function(){
			location.href="/mgcap/main/main.jsp";
		});
	}
</script>
	
	<!-- s : 상담신청팝업 -->
    <div id="prdt_counsel_app" class="layerPopup full WCC70102PS">
     
     
    <form name="counsel_write_form" method="post" enctype="multipart/form-data" action="/mgcap/customer/WCC20101DS.jsp" autocomplete="off">
		<input type="hidden" name="flag" value="">
		<input type="hidden" name="no" value="">
		<input type="hidden" name="cnsl_cntn" value=""> 
		<input type="hidden" name="w_user_ip" value="211.234.198.102">
		<input type="hidden" name="w_creator" value="">
		<input type="hidden" name="counsel_nm" id="counsel_nm" value="">
		
		<input type="hidden" name="nots_fixd_yn" value=""> <!-- 회신방법  2025.11.18 추가 -->
		<input type="hidden" name="w_wrtr_psnm" value=""> <!-- 고객명  2025.11.18 추가 -->
		<input type="hidden" name="counsel_type" value=""> <!-- 상품코드  2025.11.18 추가 -->
		<input type="hidden" name="w_wrtr_tel1" value="">  
		<input type="hidden" name="w_wrtr_tel2" value=""> 
		
		<input type="hidden" name="w_wrtr_tel3" value="">  
		<input type="hidden" name="w_emal" value="">  
		<input type="hidden" name="w_emal_domain" value="">  
		<input type="hidden" name="w_title" value="">
		<input type="hidden" name="w_content" value="">  
    </form>
    
        <div class="pop-area">
            <div class="pop-header">
                <h2 class="pop-tit">상담신청</h2>
            </div>

            <div class="pop-body">
                <div class="pop-content">
                     
                    <div class="table-content">
                        <table>
                            <caption>상담신청 입력 폼</caption>
                            <colgroup>
                                <col style="width: 260px;"> 
                                <col style="width: auto;">  
                            </colgroup>
                            <tbody>
                                <!-- 상품 분류 -->
                                <tr>
                                    <th scope="row"><label for="search_gb">상품 분류</label></th>
                                    <td>
                                        <select id="search_gb" name="search_gb" title="상품 분류 선택" onchange="errorClearFun(this);">
                                            <option value="선택">구분선택</option><option value="EMEF01">설비기기 리스</option><option value="EMEF02">산업재 오토론</option><option value="EMMF01">의료기기 리스</option><option value="EMMF02">의료기기 할부</option><option value="AUAF01">장기렌터카</option><option value="AUAF02">신차 운용리스</option><option value="AUAF03">중고차 할부금융</option><option value="AUAF04">바이크 리스</option><option value="HSHF01">사업자 아파트 담보 대출</option><option value="IVIF01">기업 금융</option><option value="IVIF02">부동산 금융</option><option value="IVIF03">팩토링</option>
                                        </select>
                                        <span class="counsel_type_dis_err" style="display:none;">상품분류를 선택해 주세요.</span>
                                    </td>
                                </tr>
                                <!-- 고객명 -->
                                <tr>
                                    <th scope="row"><label for="w_wrtr_psnm_dis">고객명</label></th>
                                    <td>
                                        <input id="w_wrtr_psnm_dis" type="text" name="w_wrtr_psnm_dis" maxlength="12" class="form-control" style="ime-mode:auto;" placeholder="고객명 입력"> 
                                        <span class="w_wrtr_psnm_dis_err" style="display:none;">고객명을 입력해주세요</span>
                                    </td>
                                </tr>
                                <!-- 회신방법 -->
                                <tr>
                                    <th scope="row"><label for="reply">회신방법</label></th>
                                    <td>
                                        <fieldset class="form-content">
                                            <div class="form-wrap">
                                                <div class="form-group">
                                                    <div class="flex-row gap20"> 
                                                        <label for="nots_fixd_yn_dis_p" class="radio">
                                                            <input type="radio" id="nots_fixd_yn_dis_p" name="nots_fixd_yn_dis" value="P" class="nots_fixd_yn_dis_pe" checked="">
                                                            <span>휴대폰</span>
                                                        </label>
                                                        <label for="nots_fixd_yn_dis_e" class="radio">
                                                            <input type="radio" id="nots_fixd_yn_dis_e" name="nots_fixd_yn_dis" value="E" class="nots_fixd_yn_dis_pe">
                                                            <span>이메일</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </td>
                                </tr>
                                <!-- 연락처 -->
                                <tr class="retrun_dis_p">
                                    <th scope="row"><label for="w_wrtr_tel_dis">연락처</label></th>
                                    <td>
                                        <input id="w_wrtr_tel_dis" type="number" name="w_wrtr_tel_dis" maxlength="11" onkeyup="javascript:inputNUMFormat(this,11);" style="ime-mode:auto;" class="form-control" placeholder="숫자만 입력"> <!-- 입력시 클래스 제거 -->
                                        <span class="w_wrtr_tel_dis_err" style="display:none;">휴대폰번호 11자리를 정확히 입력해 주세요</span>
                                    </td>
                                </tr>
                                <!-- 이메일 -->
                                <tr class="retrun_dis_e" style="display:none;">
                                    <th scope="row">이메일</th>
                                    <td>
                                        <fieldset class="form-group">
                                            <legend class="sr-only">이메일 입력</legend>
                                            <div class="email flex-row gap10">
                                                <label for="w_emal_dis" class="sr-only">이메일 아이디</label>
                                                <input id="w_emal_dis" name="w_emal_dis" maxlength="30" type="text" class="email-id">
                                                <span>@</span>
                                                <label for="w_emal_domain_dis" class="sr-only">도메인</label>
                                                <input id="w_emal_domain_dis" name="w_emal_domain_dis" maxlength="30" type="text" class="email-domain">
                                            </div>
                                            <label for="sel_domain_dis" class="sr-only">도메인 선택</label>
                                            <select onchange="chgDomain(this);" id="sel_domain_dis" name="sel_domain_dis" class="email-select"> 
                                                
													<option value="직접입력" selected="">직접입력</option> 
   													<option value="gmail.com">gmail.com</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="hanmail.net">hanmail.net</option>
                                                    <option value="daum.net">daum.net</option>
                                                    <option value="nate.com">nate.com</option>
                                            </select>
                                        </fieldset>
                                        <!-- <span class="error">이메일을 입력해주세요</span> --> <!--필요시 주석 제거-->
                                        <span class="w_emal_dis_err" style="display:none;">이메일을 입력해주세요</span>
                                    </td>
                                </tr>
                                <!-- 연락처 -->
                                <tr>
                                    <th scope="row"><label for="w_title_dis">제목</label></th>
                                    <td>
                                        <input id="w_title_dis" type="text" name="w_title_dis" maxlength="32" class="form-control" style="ime-mode:auto;" placeholder="제목 입력"> <!-- 입력시 클래스 제거 -->
                                        <span class="w_title_dis_err" style="display:none;">제목을 입력해주세요</span>
                                    </td>
                                </tr>
                                <!-- 상담내용 -->
                                <tr>
                                    <th scope="row"><label for="w_content_dis">상담내용</label></th>
                                    <td>
                                        <textarea id="w_content_dis" name="w_content_dis" maxlength="1000" style="ime-mode:auto;" placeholder="상담내용 입력"></textarea> 
                                        <span class="w_content_dis_err" style="display:none;">상담내용을 입력해주세요.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="form-content">
                        <div class="form-wrap">
                            <fieldset>
                                <legend>상담 정보 이용 동의</legend>
                                <label for="agree_dis" class="check">
                                    <input type="checkbox" id="agree_dis" name="agree_dis" value="" required="">
                                    <p>위 내용을 상담을 위한 정보로 이용하는 것에 동의합니다.</p>
                                </label>
                                <p class="agree_dis_err error" style="display:none; margin-left:42px;">상담을 위한 정보 이용에 동의해 주세요.</p>
                            </fieldset>
                        </div>
                    </div>
                     
                    <div class="info-content bo-t0 info_read">
                        <div class="note-group">
                            <p class="tit">유의사항 안내</p>
                            <ul class="m-dot">
                                <li>입력하신 정보는 본인확인 및 상담 용도로만 사용되며 상담 처리를 위해 일정기간동안 보관됩니다.</li>
                                <li>담당자의 업무가 많을 경우 답변이 늦어질 수 있습니다.</li>
                                <li>답변이 지연될 경우 "1588-9688"로 전화주시기 바랍니다</li>
                                <li>로그인 후 상담신청을 하신 경우에만 작성내용을 확인 할 수 있으며, 비로그인 상태에서 상담신청을 하신 경우에는 그 내용을 고객님은 확인하실 수 없습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-footer">
                <div class="button-content">
                    <button type="button" class="btn-pop-secondary prdt_counsel_app_close">닫기</button>
                    <button type="button" onclick="consoulFun();" class="btn-pop-primary">신청</button>
                </div>
            </div>
        </div>
     
    </div> 
    <!-- e: 상담신청 팝업(fullPopup1) -->
    <iframe id="ifh2" name="ifh2" frameborder="0" src="/jsp/blank.jsp" style="visibility:hidden;width:0px;height:0px" title="빈프레임"></iframe><!-- 상담신청 팝업 --> 

<!-- s:데이터 프로그래스 -->
<div class="modal-container">
    <div id="dataLoad" class="layerPopup modal ">
        <div class="pop-content dataload">
            <div class="pop-body">
                <p class="tit">데이터를 불러오고 있어요!</p>
                <p>오래 기다리게 해드려서 죄송합니다.<br>잠시만 기다려 주세요!</p>
                <div class="data-loader"></div>
            </div>
            <!-- 주석 풀면 취소버튼 이용 가능
            <div class="pop-footer">
                <div class="button-content">
                    <button type="button" class="btn-pop-primary"  data-popup-close="dataLoad">취소</button>
                </div>
            </div>
             -->
        </div>
    </div>
</div>
<!-- e:데이터 프로그래스 -->

<!-- s: 일반프로그래스 -->
<div class="loading-content" id="loading_Info" style="display:none;">
	<div class="loader"></div>
</div>
<!-- e: 일반프로그래스 -->