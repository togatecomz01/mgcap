<!--[D]:개발스크립트 삭제-->
<script type="text/javascript" src="../../assets/js/ui/ui-util.js"></script>


<div class="form-content">
    <h3>경력사항</h3>
    <form class="form-content">
        <!-- 병역특례 경력사항 -->
        <div class="table-group">
        <h4>병역특례 경력사항</h4>
            <table class="td-l">
                <caption>병역특례 경력사항 입력표(근무처, 근무기간, 담당업무 포함)</caption>
                <colgroup class="col-w3">
                    <col style="width:450px">
                    <col style="width:420px"> 
                    <col style="width:auto">
                </colgroup>
                <thead>
                <tr>
                    <th scope="col">근무처</th>
                    <th scope="col">근무기간</th>
                    <th scope="col">담당업무</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>병역특례 근무처</td>
                    <td>YYYY.MM.DD ~ YYYY.MM.DD</td>
                    <td>담당업무내용</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--경력-->
        <div class="edu-repeat" data-title="경력" data-max="10">    
            <div class="table-group" data-index="1">
                <h4>경력</h4>
                <table class="td-l">
                    <caption>경력 입력표(근무처, 근무기간, 직위, 담당업무, 연봉, 퇴직사유, 세부 경력 소개)</caption>
                    <colgroup class="col-w4">
                        <col style="width:262px">
                        <col style="width:auto">
                        <col style="width:262px">
                        <col style="width:auto">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">근무처</th>
                            <td> MG캐피탈</td>
                            <th scope="row">근무기간</th>
                            <td>YYYY.MM.DD ~ YYYY.MM.DD</td>
                        </tr>
                        <tr>
                            <th scope="row">직위</th>
                            <td>대리</td>
                            <th scope="row">담당업무</th>
                            <td>담당업무 입력</td>
                        </tr>
                        <tr>
                            <th scope="row">연봉</th>
                        <td>3000만원</td>
                        <th scope="row">퇴직사유</th>
                        <td>개인사정</td>
                        </tr>
                        <tr>
                        <th scope="row"><label for="introduceYourself">세부 경력 소개</label></th>
                        <td colspan="3">
                           <div class="textarea-wrap">내용</div>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</div><!--//form-content-->
