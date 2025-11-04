<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>

<div class="form-content">
    <div class="text-content">
        <div class="text-group">
            <h3>경력사항</h3>
            <ul class="diamond-box">
                <li>추후 제출서류와 지원서 작성내용이 다를 경우 합격 취소 또는 불합격 처리 됩니다.</li>
                <li>지원서 작성 시 사전에 제출서류를 구비하여 오류 입력에 따른 합격 취소등의 불이익이 없도록 유의 바랍니다.</li>
                <li>제출서류는 MG캐피탈 홈페이지의 채용공고 참고 바랍니다.</li> 
            </ul>
        </div>
    </div>
    <form class="form-content">
        <!-- 병역특례 경력사항 -->
        <div class="table-group">
        <h4>병역특례 경력사항</h4>
            <table class="td-l">
                <caption>병역특례 경력사항 입력표(근무처, 근무기간, 담당업무 포함)</caption>
                <colgroup>
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
                    <td>
                        <label for="milCompany1" class="sr-only">근무처</label>
                        <span class="ipt-clear">
                            <input id="milCompany1" name="milCompany1" type="text">
                        </span>
                    </td>
                    <td>
                        <fieldset class="form-gruop">
                            <legend class="sr-only">근무기간</legend>
                            <div class="form-group">
                                <label for="milStart1" class="sr-only">근무 시작일</label>
                                <input id="milStart1" name="milStart1" type="date">
                                <label for="milEnd1" class="sr-only">근무 종료일</label>
                                <input id="milEnd1" name="milEnd1" type="date">
                            </div>
                        </fieldset>
                    </td>
                    <td>
                        <label for="milDuty1" class="sr-only">담당업무</label>
                        <span class="ipt-clear"><input id="milDuty1" name="milDuty1" type="text"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--경력-->
        <div class="edu-repeat" data-title="경력" data-max="5">    
            <div class="table-group" data-index="1">
                <h4>경력</h4>
                <table class="td-l">
                    <caption>경력 입력표(근무처, 근무기간, 직위, 담당업무, 연봉, 퇴직사유, 세부 경력 소개)</caption>
                    <colgroup>
                        <col style="width:262px">
                        <col style="width:auto">
                        <col style="width:262px">
                        <col style="width:auto">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row"><label for="companyName">근무처</label></th>
                            <td>
                                <span class="ipt-clear"><input id="companyName" name="companyName" type="text"></span>
                            </td>
                            <th scope="row"><label for="workStart">근무기간</label></th>
                            <td>
                            <fieldset class="form-group">
                                <legend class="sr-only">근무기간</legend>
                                <label for="workStart" class="sr-only">근무 시작일</label>
                                <input id="workStart" name="workStart" type="date">
                                <label for="workEnd" class="sr-only">근무 종료일</label>
                                <input id="workEnd" name="workEnd" type="date">
                            </fieldset>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="position">직위</label></th>
                            <td>
                                <span class="ipt-clear"><input id="position" name="position" type="text"></span>
                            </td>
                            <th scope="row"><label for="duty">담당업무</label></th>
                            <td>
                                <span class="ipt-clear"><input id="duty" name="duty" type="text"></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="salary">연봉</label></th>
                            <td>
                                <span class="txt-unit ipt-clear">
                                    <input id="salary" name="salary" class="unit" type="number" style="padding-right:120px;">
                                    <span class="txt">만원</span>
                                </span>
                            </td>
                            <th scope="row"><label for="leaveReason">퇴직사유</label></th>
                            <td>
                                <span class="ipt-clear"><input id="leaveReason" name="leaveReason" type="text"></span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="careerDetail">세부 경력 소개</label></th>
                            <td colspan="3">
                            <div class="textarea-wrap">
                                <textarea id="careerDetail" name="careerDetail" rows="6" maxlength="1000"></textarea>
                                <div class="char-counter" id="careerCounter" aria-live="polite">
                                    <span class="current">0</span>/<span class="max">1000</span>자
                                </div>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="button btn-add">추가</button>
                <button type="button" class="btn-del">삭제</button>
            </div>
        </div>
    </form>
</div><!--//form-content-->