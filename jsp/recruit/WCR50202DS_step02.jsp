<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>

<div class="form-content">
    <h3 class="essential">학력사항</h3>
    <form class="form-content">
        <!--고등학교/검정고시-->
        <div class="table-group">
            <fieldset class="form-group abs">
                <legend class="sr-only">고등학교/검정고시 선택</legend>
                <label class="radio" data-tab="radio-tab01" class="tab-item">
                    <input type="radio" name="use" value="" checked="">
                    <span>고등학교</span>
                </label>
                <label class="radio" data-tab="radio-tab02" class="tab-item">
                    <input type="radio" name="use" value="">
                    <span>검정고시</span>
                </label>
            </fieldset>
            <div id="radio-tab01">
                <h4 class="essential">고등학교</h4>
                <div class="tab-content">
                    <table class="td-l">
                        <caption>고등학교 입력표(학교명, 기간, 졸업구분, 전공명, 학점 포함)</caption>
                        <colgroup>
                            <col style="width:262px">
                            <col style="width:auto">
                            <col style="width:262px">
                            <col style="width:auto">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th scope="row"><label for="hs-school">학교명</label></th>
                            <td class="tal" colspan="3">
                                <span class="txt-unit ipt-clear">
                                    <input id="hs-school" name="hsSchool" type="text" style="padding-right:120px;">
                                    <span class="txt" aria-hidden="true">고등학교</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="hsPeriodStart">기간</label></th>
                            <td class="tal">
                                <fieldset class="form-group">
                                    <legend class="sr-only">기간</legend>
                                    <input type="month" id="hsPeriodStart" name="hsPeriodStart" aria-label="입학">
                                    <input type="month" id="hsPeriodEnd" name="hsPeriodEnd" aria-label="졸업">
                                </fieldset>
                            </td>
                            <th scope="row"><label for="hs-grad">졸업구분</label></th>
                            <td class="tal">
                                <select id="hs-grad" name="hsGrad" title="졸업구분 선택">
                                <option value="" disabled selected hidden>졸업구분 선택</option>
                                <option value="grad">졸업</option>
                                <option value="expected">졸업예정</option>
                                <option value="drop">중퇴</option>
                                <option value="transfer">전학</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                        <th scope="row"><label for="hs-major">전공명</label></th>
                        <td class="tal" colspan="3">
                            <span class="txt-unit ipt-clear">
                                <input id="hs-major" name="hsMajor" type="text" style="padding-right:80px;">
                                <span class="txt">계열</span>
                            </span>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row"><label for="hs-gpa"></label>학점</th>
                        <td class="tal" colspan="3">
                            <fieldset class="form-group">
                                <legend class="sr-only">학점 입력(취득/만점)</legend>
                                <input id="hs-gpa" name="hsGpa" type="number" aria-label="취득학점 입력">
                                /
                                <input id="hs-gpa-max" name="hsGpaMax" type="number" aria-label="만점 입력">
                            </fieldset>
                            <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하세요.</p>
                        </td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다.</p>
                </div>
            </div>
            <div id="radio-tab02">
                <h4 class="essential">검정고시</h4>
                <div class="tab-content">
                    <table class="td-l">
                        <caption>검정고시 입력표</caption>
                        <colgroup>
                            <col style="width:262px">
                            <col style="width:auto">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row"><label for="qualificationExamination">검정고시</label></th>
                                <td class="tal">
                                    <span class="txt-unit ipt-clear">
                                        <span class="txt" style="left:16px;right:initial;">제</span>
                                        <input id="qualificationExamination" name="" type="text" style="padding-left:50px; padding-right:60px;">
                                        <span class="txt">호</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div><!--//table-group-->
        <!--전문대학-->
        <div class="table-group">
            <h4>전문대학</h4>
            <table class="td-l">
                <caption>전문대학 입력표(학교명, 기간, 졸업구분, 전공명, 학점 포함)</caption>
                <colgroup>
                    <col style="width:262px">
                    <col style="width:auto">
                    <col style="width:262px">
                    <col style="width:auto">
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row"><label for="techSchool">학교명</label></th>
                        <td class="tal" colspan="3">
                            <span class="txt-unit ipt-clear">
                                <input id="techSchool" name="" type="text" value="" style="padding-right:120px;">
                                <span class="txt">고등학교</span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="techPeriodStart">기간</label></th>
                        <td class="tal">
                            <fieldset class="form-group">
                                <legend class="sr-only">기간</legend>
                                <input type="month" id="techPeriodStart" name="techPeriodStart" aria-label="입학">
                                <input type="month" id="techPeriodEnd" name="techPeriodEnd" aria-label="졸업">
                            </fieldset>
                        </td>
                        <th scope="row"><label for="techgrad">졸업구분</label></th>
                        <td class="tal">
                            <select id="techgrad" name="techgrad" title="졸업구분 선택">
                                <option value="" disabled selected hidden>졸업구분 선택</option>
                                <option value="grad">졸업</option>
                                <option value="expected">졸업예정</option>
                                <option value="drop">중퇴</option>
                                <option value="transfer">전학</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="techMajor">전공명</label></th>
                        <td class="tal" colspan="3">
                            <span class="ipt-clear">
                                <input id="techMajor" name="" type="text" value="">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="techGpa">학점</label></th>
                        <td class="tal" colspan="3">
                            <fieldset class="form-group">
                                <legend class="sr-only">학점 입력(취득/만점)</legend>
                                <input id="techGpa" name="techGpa" type="number" aria-label="취득학점 입력">
                                /
                                <input id="techGpaMax" name="techGpaMax" type="number" aria-label="만점 입력">
                            </fieldset>
                            <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div><!--//table-group-->
        <!--대학교(4년제)-->
        <div class="edu-repeat" data-title="대학교(4년제)" data-max="2">    
            <div class="table-group" data-index="1">
            <h4>대학교(4년제)</h4>
            <table class="td-l">
                <caption>대학교(4년제) 입력표(학교명, 기간, 졸업구분, 전공명, 학점 포함)</caption>
                <colgroup>
                    <col style="width:262px">
                    <col style="width:auto">
                    <col style="width:262px">
                    <col style="width:auto">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row" rowspan="2">
                        <label for="univSchool">학교명</label>
                    </th>
                    <td class="tal" rowspan="2">
                    <span class="txt-unit ipt-clear">
                        <input id="univSchool" name="univSchool" type="text" style="padding-right:120px;">
                        <span class="txt">대학교</span>
                    </span>
                    </td>
        
                    <th scope="row">본교/분교</th>
                        <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">본교/분교 선택</legend>
                            <label class="radio" for="univCampusMain"><input type="radio" id="univCampusMain" name="univCampus" value="main"> 본교</label>
                            <label class="radio" for="univCampusBranch"><input type="radio" id="univCampusBranch" name="univCampus" value="branch"> 분교</label>
                        </fieldset>
                        </td>
                </tr>
                <tr>
                    <th scope="row">주간/야간</th>
                    <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">주간/야간 선택</legend>
                            <label class="radio"><input type="radio" id="univTimeDay" name="univTime" value="day"> 주간</label>
                            <label class="radio"><input type="radio" id="univTimeNight" name="univTime" value="night"> 야간</label>
                        </fieldset>
                    </td>
                </tr>
        
                <tr>
                    <th scope="row"><label for="univPeriodStart">기간</label></th>
                    <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">기간</legend>
                            <input type="month" id="hs-period-start" name="univPeriodStart" aria-label="입학">
                            <input type="month" id="hs-period-start" name="univPeriodEnd" aria-label="졸업">
                        </fieldset>
                    </td>
                    <th scope="row"><label for="univStatus">졸업구분</label></th>
                    <td class="tal">
                        <select id="univStatus" name="univStatus" title="졸업구분 선택">
                            <option value="">선택해주세요</option>
                            <option>졸업</option>
                            <option>재학</option>
                            <option>휴학</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="univMajor">전공명</label></th>
                    <td class="tal" colspan="3">
                    <span class="txt-unit ipt-clear">
                        <input id="univMajor" name="univMajor" type="text" style="padding-right:80px;">
                        <span class="txt">계열</span>
                    </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="univGradeGot">학점</label></th>
                    <td class="tal" colspan="3">
                        <fieldset class="form-group">
                            <legend class="sr-only">학점 입력(취득/만점)</legend>
                            <input id="univGradeGot" name="univGradeGot" type="number" aria-label="취득학점 입력">
                            /
                            <input id="univGradeMax" name="univGradeMax" type="number" aria-label="만점 입력">
                        </fieldset>
                        <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다.</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="button" class="button btn-add">추가</button>
            <button type="button" class="btn-del">삭제</button>
            </div>
        </div>
        <!--대학교(석사)-->
        <div class="edu-repeat" data-title="대학교(석사)" data-max="2">    
            <div class="table-group" data-index="1">
                <h4>대학교(석사)</h4>
                <table class="td-l">
                    <caption>대학교(석사) 입력표(학교명, 본교/분교, 주간/야간, 기간, 졸업구분, 전공명, 세부정공 소개, 학점 포함)</caption>
                    <colgroup>
                        <col style="width:262px">
                        <col style="width:auto">
                        <col style="width:262px">
                        <col style="width:auto">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row" rowspan="2"><label for="univSchool2">학교명</label></th>
                        <td class="tal" rowspan="2">
                        <span class="txt-unit ipt-clear">
                            <input id="univSchool2" name="univSchool2" type="text" style="padding-right:120px;">
                            <span class="txt">대학교</span>
                        </span>
                        </td>
                        <th scope="row">본교/분교</th>
                        <td class="tal">
                            <fieldset class="form-group">
                                <legend class="sr-only">본교/분교 선택</legend>
                                <label class="radio" for="univCampusMain"><input type="radio" id="univCampusMain2" name="univCampus2" value="main"> 본교</label>
                                <label class="radio" for="univCampusBranch"><input type="radio" id="univCampusBranch2" name="univCampus2" value="branch"> 분교</label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">주간/야간</th>
                        <td class="tal">
                            <fieldset class="form-group">
                                <legend class="sr-only">주간/야간 선택</legend>
                                <label class="radio"><input type="radio" id="univTimeDay2" name="univTime2">주간</label>
                                <label class="radio"><input type="radio" id="univTimeNight2" name="univTime2">야간</label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="univPeriodStart2">기간</label></th>
                        <td class="tal">
                            <fieldset class="form-group">
                                <legend class="sr-only">기간</legend>
                                <input type="month" id="univPeriodStart2" name="univPeriodStart2" aria-label="입학">
                                <input type="month" id="univPeriodEnd2" name="univPeriodEnd2" aria-label="졸업">
                            </fieldset>
                        </td>
                        <th scope="row"><label for="univStatus2">졸업구분</label></th>
                        <td class="tal">
                            <select id="univStatus" name="univStatus2" title="졸업구분 선택">
                                <option value="">선택해주세요</option>
                                <option>졸업</option>
                                <option>재학</option>
                                <option>휴학</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="univMajor2">전공명</label></th>
                        <td class="tal">
                        <span class="ipt-clear">
                            <input id="univMajor2" name="univMajor2" type="text">
                        </span>
                        </td>
                        <th scope="row"><label for="univMajor2">세부전공 소개</label></th>
                        <td class="tal">
                        <span class="ipt-clear">
                            <input id="detailedMajor2" name="detailedMajor2" type="text">
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="univGradeGot2">학점</label></th>
                        <td class="tal" colspan="3">
                            <fieldset class="form-group">
                                <legend class="sr-only">학점 입력(취득/만점)</legend>
                                <input id="univGradeGot2" name="univGradeGot2" type="number" aria-label="취득학점 입력">
                                /
                                <input id="univGradeMax2" name="univGradeMax2" type="number" aria-label="만점 입력">
                            </fieldset>
                            <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다.</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" class="button btn-add">추가</button>
                <button type="button" class="btn-del">삭제</button>
            </div>
        </div>
        <!--대학교(박사)-->
        <div class="table-group">
            <h4>대학교(박사)</h4>
            <table class="td-l">
                <caption>대학교(박사) 입력표(학교명, 본교/분교, 주간/야간, 기간, 졸업구분, 전공명, 연구실적 소개, 학점 포함)</caption>
                <colgroup>
                    <col style="width:262px">
                    <col style="width:auto">
                    <col style="width:262px">
                    <col style="width:auto">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row" rowspan="2">
                    <label for="univSchool3">학교명</label>
                    </th>
                    <td class="tal" rowspan="2">
                        <span class="txt-unit ipt-clear">
                            <input id="univSchool3" name="univSchool3" type="text" style="padding-right:120px;">
                            <span class="txt">대학교</span>
                        </span>
                    </td>
                    <th scope="row">본교/분교</th>
                    <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">본교/분교 선택</legend>
                            <label class="radio" for="univCampusMain3"><input type="radio" id="univCampusMain3" name="univCampus3" value="main"> 본교</label>
                            <label class="radio" for="univCampusBranch3"><input type="radio" id="univCampusBranch3" name="univCampus3" value="branch"> 분교</label>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row">주간/야간</th>
                    <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">주간/야간 선택</legend>
                            <label class="radio"><input type="radio" id="univTimeDay3" name="univTime3" value="day"> 주간</label>
                            <label class="radio"><input type="radio" id="univTimeNight3" name="univTime2" value="night"> 야간</label>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="univPeriodStart3">기간</label></th>
                    <td class="tal">
                        <fieldset class="form-group">
                            <legend class="sr-only">기간</legend>
                            <input type="month" id="univPeriodStart3" name="univPeriodStart3" aria-label="입학">
                            <input type="month" id="univPeriodEnd3" name="univPeriodEnd3" aria-label="졸업">
                        </fieldset>
                    </td>
                    <th scope="row"><label for="univStatus3">졸업구분</label></th>
                    <td class="tal">
                        <select id="univStatus" name="univStatus3" title="졸업구분 선택">
                            <option value="">선택해주세요</option>
                            <option>졸업</option>
                            <option>재학</option>
                            <option>휴학</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="univMajor3">전공명</label></th>
                    <td class="tal">
                    <span class="ipt-clear">
                        <input id="univMajor3" name="univMajor" type="text">
                    </span>
                    </td>
                    <th scope="row"><label for="detailedMajor3">연구실적 소개</label></th>
                    <td class="tal">
                        <span class="ipt-clear">
                            <input id="detailedMajor3" name="detailedMajor3" type="text">
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="univGradeGot3">학점</label></th>
                    <td class="tal" colspan="3">
                        <fieldset class="form-group">
                            <legend class="sr-only">학점 입력(취득/만점)</legend>
                            <input id="univGradeGot3" name="univGradeGot3" type="number" aria-label="취득학점 입력">
                            /
                            <input id="univGradeMax3" name="univGradeMax3" type="number" aria-label="만점 입력">
                        </fieldset>
                        <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다.</p>
                    </td>
                </tr>
                </tbody>
            </table>
            <p class="m-dot">최종으로 졸업한 학력을 기준으로 입력하시기 바랍니다. </p>
        </div>
    </form>
</div><!--//form-content-->
<div class="form-content">
    <h3>자격·면허</h3>
    <form class="form-content">
        <!--영어능력-->
        <div class="table-group">
            <h4>영어능력</h4>
            <table class="td-l">
                <caption>영어능력 입력표(시험종류, 점수/등급, 취득일 포함)</caption>
                <colgroup>
                    <col style="width:33.3%">
                    <col style="width:33.3%">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                    <th id="th-kind" scope="col">시험종류</th>
                    <th id="th-score" scope="col">점수/등급</th>
                    <th id="th-date" scope="col">취득일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="certificateEng1" name="certificateEng1" type="text" aria-labelledby="th-kind certificateEng1">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="scoreEng1" name="scoreEng1" type="text" inputmode="numeric" aria-labelledby="th-score scoreEng1">
                            </span>
                        </td>
                        <td>
                            <input id="acquisitionEng1" name="acquisitionEng1" type="date" aria-labelledby="th-date acquisitionEng1">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="certificateEng2" name="certificateEng2" type="text" aria-labelledby="th-kind certificateEng2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="scoreEng2" name="scoreEng2" type="text" inputmode="numeric" aria-labelledby="th-score scoreEng2">
                            </span>
                        </td>
                        <td>
                            <input id="acquisitionEng2" name="acquisitionEng2" type="date" aria-labelledby="th-date acquisitionEng2">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="certificateEng3" name="certificateEng3" type="text" aria-labelledby="th-kind certificateEng3">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="scoreEng3" name="scoreEng3" type="text" inputmode="numeric" aria-labelledby="th-score scoreEng3">
                            </span>
                        </td>
                        <td>
                            <input id="acquisitionEng3" name="acquisitionEng3" type="date" aria-labelledby="th-date acquisitionEng3">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="certificateEng4" name="certificateEng4" type="text" aria-labelledby="th-kind certificateEng4">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="scoreEng4" name="scoreEng4" type="text" inputmode="numeric" aria-labelledby="th-score scoreEng4">
                            </span>
                        </td>
                        <td>
                            <input id="acquisitionEng4" name="acquisitionEng4" type="date" aria-labelledby="th-date acquisitionEng4">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 제2외국어 -->
        <div class="table-group">
            <h4>제2외국어</h4>
            <table class="td-l">
                <caption>제2외국어 입력표(시험종류, 점수/등급, 취득일 포함)</caption>
                <colgroup>
                    <col style="width:33.3%">
                    <col style="width:33.3%">
                    <col style="width:auto">
                </colgroup>
                <thead>
                <tr>
                    <th id="th-kindSec" scope="col">시험종류</th>
                    <th id="th-scoreSec" scope="col">점수/등급</th>
                    <th id="th-dateSec" scope="col">취득일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <span class="ipt-clear">
                            <input id="certificateSec1" name="certificateSec1" type="text" aria-labelledby="th-kindSec certificateSec1">
                        </span>
                    </td>
                    <td>
                        <span class="ipt-clear">
                            <input id="scoreSec1" name="scoreSec1" type="text" inputmode="numeric" aria-labelledby="th-scoreSec scoreSec1">
                        </span>
                    </td>
                    <td>
                        <input id="acquisitionSec1" name="acquisitionSec1" type="date" aria-labelledby="th-dateSec acquisitionSec1">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="ipt-clear">
                            <input id="certificateSec2" name="certificateSec2" type="text" aria-labelledby="th-kindSec certificateSec2">
                        </span>
                    </td>
                    <td>
                        <span class="ipt-clear">
                            <input id="scoreSec2" name="scoreSec2" type="text" inputmode="numeric" aria-labelledby="th-scoreSec scoreSec2">
                        </span>
                    </td>
                    <td>
                        <input id="acquisitionSec2" name="acquisitionSec2" type="date" aria-labelledby="th-dateSec acquisitionSec2">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="ipt-clear">
                            <input id="certificateSec3" name="certificateSec3" type="text" aria-labelledby="th-kindSec certificateSec3">
                        </span>
                    </td>
                    <td>
                        <span class="ipt-clear">
                            <input id="scoreSec3" name="scoreSec3" type="text" inputmode="numeric" aria-labelledby="th-scoreSec scoreSec3">
                        </span>
                    </td>
                    <td>
                        <input id="acquisitionSec3" name="acquisitionSec3" type="date" aria-labelledby="th-dateSec acquisitionSec3">
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="ipt-clear">
                            <input id="certificateSec4" name="certificateSec4" type="text" aria-labelledby="th-kindSec certificateSec4">
                        </span>
                    </td>
                    <td>
                        <span class="ipt-clear">
                            <input id="scoreSec4" name="scoreSec4" type="text" inputmode="numeric" aria-labelledby="th-scoreSec scoreSec4">
                        </span>
                    </td>
                    <td>
                        <input id="acquisitionSec4" name="acquisitionSec4" type="date" aria-labelledby="th-dateSec acquisitionSec4">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 자격·면허사항 (시험장 기준) -->
        <div class="table-group">
            <h4>자격·면허사항</h4>
            <table class="td-l">
                <caption>자격·면허사항 입력표(자격증, 자격등급, 취득일, 발행기관 포함)</caption>
                <colgroup>
                    <col style="width:28%">
                    <col style="width:22%">
                    <col style="width:22%">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                        <th id="th-cert"  scope="col">자격증</th>
                        <th id="th-grade" scope="col">자격등급</th>
                        <th id="th-date2" scope="col">취득일</th>
                        <th id="th-period" scope="col">발행기관</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseCert1" name="licenseCert1" type="text" aria-labelledby="th-cert licenseCert1">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseGrade1" name="licenseGrade1" type="text" aria-labelledby="th-grade licenseGrade1">
                            </span>
                        </td>
                        <td>
                            <input id="licenseAcq1" name="licenseAcq1" type="date" aria-labelledby="th-date2 licenseAcq1">
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licensePeriod1" name="licensePeriod1" type="text" aria-labelledby="th-period licensePeriod1">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseCert2" name="licenseCert2" type="text" aria-labelledby="th-cert licenseCert2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseGrade2" name="licenseGrade2" type="text" aria-labelledby="th-grade licenseGrade2">
                            </span>
                        </td>
                        <td>
                            <input id="licenseAcq2" name="licenseAcq2" type="date" aria-labelledby="th-date2 licenseAcq2">
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licensePeriod2" name="licensePeriod2" type="text" aria-labelledby="th-period licensePeriod2">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseCert3" name="licenseCert3" type="text" aria-labelledby="th-cert licenseCert3">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseGrade3" name="licenseGrade3" type="text" aria-labelledby="th-grade licenseGrade3">
                            </span>
                        </td>
                        <td>
                            <input id="licenseAcq3" name="licenseAcq3" type="date" aria-labelledby="th-date2 licenseAcq3">
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licensePeriod3" name="licensePeriod3" type="text" aria-labelledby="th-period licensePeriod3">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear"><input id="licenseCert4" name="licenseCert4" type="text" aria-labelledby="th-cert licenseCert4"></span>
                        </td>
                        <td>
                            <span class="ipt-clear"><input id="licenseGrade4" name="licenseGrade4" type="text" aria-labelledby="th-grade licenseGrade4"></span>
                        </td>
                        <td>
                            <input id="licenseAcq4" name="licenseAcq4" type="date" aria-labelledby="th-date2 licenseAcq4">
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licensePeriod4" name="licensePeriod4" type="text" aria-labelledby="th-period licensePeriod4">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseCert5" name="licenseCert5" type="text" aria-labelledby="th-cert licenseCert5">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licenseGrade5" name="licenseGrade5" type="text" aria-labelledby="th-grade licenseGrade5">
                            </span>
                        </td>
                        <td>
                            <input id="licenseAcq5" name="licenseAcq5" type="date" aria-labelledby="th-date2 licenseAcq5">
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="licensePeriod5" name="licensePeriod5" type="text" aria-labelledby="th-period licensePeriod5">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 해외체류경험 -->
        <div class="table-group">
            <h4>해외체류경험</h4>
            <table class="td-l">
                <caption>해외체류경험 입력표(체류국가, 체류목적, 체류기간, 사용 외국어 포함)</caption>
                <colgroup>
                    <col style="width:320px">
                    <col style="width:318px">
                    <col style="width:420px">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                        <th id="th-country" scope="col">체류국가</th>
                        <th id="th-purpose" scope="col">체류목적</th>
                        <th id="th-period" scope="col">체류기간</th>
                        <th id="th-lang" scope="col">사용 외국어</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry1" name="stayCountry1" type="text" aria-labelledby="th-country stayCountry1">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayPurpose1" name="stayPurpose1" type="text" aria-labelledby="th-purpose stayPurpose1">
                            </span>
                        </td>
                        <td>
                            <fieldset class="form-group">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart1" name="stayStart1" type="date" aria-labelledby="th-period stayStart1" aria-label="체류기간(시작일)">
                                <input id="stayEnd1" name="stayEnd1" type="date" aria-labelledby="th-period stayEnd1" aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang1" name="stayLang1" type="text"  aria-labelledby="th-lang stayLang1">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry2" name="stayCountry2" type="text" aria-labelledby="th-country stayCountry2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                            <input id="stayPurpose2" name="stayPurpose2" type="text" aria-labelledby="th-purpose stayPurpose2">
                            </span>
                        </td>
                        <td>
                            <fieldset class="form-group">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart1" name="stayStart2" type="date" aria-labelledby="th-period stayStart2" aria-label="체류기간(시작일)">
                                <input id="stayEnd1" name="stayEnd2" type="date" aria-labelledby="th-period stayEnd2" aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang2" name="stayLang2" type="text" aria-labelledby="th-lang stayLang2">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry3" name="stayCountry3" type="text" aria-labelledby="th-country stayCountry3">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayPurpose3" name="stayPurpose3" type="text" aria-labelledby="th-purpose stayPurpose3">
                            </span>
                        </td>
                        <td>
                            <fieldset class="form-group">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart3" name="stayStart1" type="date" aria-labelledby="th-period stayStart3" aria-label="체류기간(시작일)">
                                <input id="stayEnd3" name="stayEnd1" type="date" aria-labelledby="th-period stayEnd3" aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang3" name="stayLang3" type="text" aria-labelledby="th-lang stayLang3">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        
        </div>
        <!-- 수상경력 -->
        <div class="table-group">
            <h4>수상경력</h4>
            <table class="td-l">
                <caption>해외체류경험 입력표(체류국가, 체류목적, 체류기간, 사용 외국어 포함)</caption>
                <colgroup>
                    <col style="width:320px">
                    <col style="width:318px">
                    <col style="width:420px">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                        <th id="th-country" scope="col">체류국가</th>
                        <th id="th-purpose" scope="col">체류목적</th>
                        <th id="th-period"  scope="col">체류기간</th>
                        <th id="th-lang"    scope="col">사용 외국어</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry1" name="stayCountry1" type="text" aria-labelledby="th-country stayCountry1">
                            </span>
                        </td>
                        <td>
                        <span class="ipt-clear">
                            <input id="stayPurpose1" name="stayPurpose1" type="text" aria-labelledby="th-purpose stayPurpose1">
                        </span>
                        </td>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-period">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart1" name="stayStart1" type="date" aria-labelledby="th-period stayStart1" aria-label="체류기간(시작일)">
                                <input id="stayEnd1"   name="stayEnd1" type="date" aria-labelledby="th-period stayEnd1" aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang1" name="stayLang1" type="text" aria-labelledby="th-lang stayLang1">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry2" name="stayCountry2" type="text" aria-labelledby="th-country stayCountry2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayPurpose2" name="stayPurpose2" type="text" aria-labelledby="th-purpose stayPurpose2">
                            </span>
                        </td>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-period">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart2" name="stayStart2" type="date" aria-labelledby="th-period stayStart2" aria-label="체류기간(시작일)">
                                <input id="stayEnd2" name="stayEnd2" type="date" aria-labelledby="th-period stayEnd2" aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang2" name="stayLang2" type="text" aria-labelledby="th-lang stayLang2">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayCountry3" name="stayCountry3" type="text" aria-labelledby="th-country stayCountry3">
                            </span>
                        </td>
                        <td>
                        <span class="ipt-clear">
                            <input id="stayPurpose3" name="stayPurpose3" type="text" aria-labelledby="th-purpose stayPurpose3">
                        </span>
                        </td>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-period">
                                <legend class="sr-only">체류기간</legend>
                                <input id="stayStart3" name="stayStart3" type="date" aria-labelledby="th-period stayStart3" aria-label="체류기간(시작일)">
                                <input id="stayEnd3"   name="stayEnd3"   type="date" aria-labelledby="th-period stayEnd3"   aria-label="체류기간(종료일)">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="stayLang3" name="stayLang3" type="text" aria-labelledby="th-lang stayLang3">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</div><!--//form-content-->
<div class="form-content">
    <h3>교내 활동사항</h3>
    <form class="form-content">
        <!-- 동아리 활동 -->
        <div class="table-group">
            <h4>동아리 활동</h4>
            <table class="td-l">
                <caption>동아리 활동 입력표(활동기간, 활동단체명, 활동내용 포함)</caption>
                <colgroup>
                    <col style="width:420px">
                    <col style="width:420px">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                    <th id="th-periodClub" scope="col">활동기간</th>
                    <th id="th-orgClub" scope="col">활동단체명</th>
                    <th id="th-descClub" scope="col">활동내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-periodClub">
                                <legend class="sr-only">활동기간</legend>
                                <input id="clubStart1" name="clubStart1" type="date" aria-labelledby="th-periodClub clubStart1" aria-label="활동 시작일">
                                <input id="clubEnd1" name="clubEnd1" type="date" aria-labelledby="th-periodClub clubEnd1" aria-label="활동 종료일">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubOrg1" name="clubOrg1" type="text" aria-labelledby="th-orgClub clubOrg1">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubDesc1" name="clubDesc1" type="text" aria-labelledby="th-descClub clubDesc1">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-periodClub">
                                <legend class="sr-only">활동기간</legend>
                                <input id="clubStart2" name="clubStart2" type="date" aria-labelledby="th-periodClub clubStart2" aria-label="활동 시작일">
                                <input id="clubEnd2" name="clubEnd2" type="date" aria-labelledby="th-periodClub clubEnd2" aria-label="활동 종료일">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubOrg2" name="clubOrg2" type="text" aria-labelledby="th-orgClub clubOrg2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubDesc2" name="clubDesc2" type="text" aria-labelledby="th-descClub clubDesc2">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-periodClub">
                                <legend class="sr-only">활동기간</legend>
                                <input id="clubStart3" name="clubStart3" type="date" aria-labelledby="th-periodClub clubStart3" aria-label="활동 시작일">
                                <input id="clubEnd3" name="clubEnd3" type="date" aria-labelledby="th-periodClub clubEnd3" aria-label="활동 종료일">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubOrg3" name="clubOrg3" type="text" aria-labelledby="th-orgClub clubOrg3">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="clubDesc3" name="clubDesc3" type="text"  aria-labelledby="th-descClub clubDesc3">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <!-- 사회봉사 활동 -->
        <div class="table-group">
            <h4>사회봉사 활동</h4>
            <table class="td-l">
                <caption>사회봉사 활동 입력표(활동기간, 활동단체명, 활동내용 포함)</caption>
                <colgroup>
                    <col style="width:420px">
                    <col style="width:420px">
                    <col style="width:auto">
                </colgroup>
                <thead>
                    <tr>
                        <th id="th-periodVol" scope="col">활동기간</th>
                        <th id="th-orgVol"    scope="col">활동단체명</th>
                        <th id="th-descVol"   scope="col">활동내용</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <fieldset class="form-group" aria-labelledby="th-periodVol">
                            <legend class="sr-only">활동기간</legend>
                            <input id="volunteerStart1" name="volunteerStart1" type="date" aria-labelledby="th-periodVol volunteerStart1" aria-label="활동 시작일">
                            <input id="volunteerEnd1"   name="volunteerEnd1"   type="date" aria-labelledby="th-periodVol volunteerEnd1"   aria-label="활동 종료일">
                        </fieldset>
                        </td>
                        <td>
                        <span class="ipt-clear">
                            <input id="volunteerOrg1" name="volunteerOrg1" type="text" aria-labelledby="th-orgVol volunteerOrg1">
                        </span>
                        </td>
                        <td>
                        <span class="ipt-clear">
                            <input id="volunteerDesc1" name="volunteerDesc1" type="text" aria-labelledby="th-descVol volunteerDesc1">
                        </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-periodVol">
                                <legend class="sr-only">활동기간</legend>
                                <input id="volunteerStart2" name="volunteerStart2" type="date" aria-labelledby="th-periodVol volunteerStart2" aria-label="활동 시작일">
                                <input id="volunteerEnd2"   name="volunteerEnd2"   type="date" aria-labelledby="th-periodVol volunteerEnd2"   aria-label="활동 종료일">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="volunteerOrg2" name="volunteerOrg2" type="text" aria-labelledby="th-orgVol volunteerOrg2">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="volunteerDesc2" name="volunteerDesc2" type="text" aria-labelledby="th-descVol volunteerDesc2">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset class="form-group" aria-labelledby="th-periodVol">
                                <legend class="sr-only">활동기간</legend>
                                <input id="volunteerStart3" name="volunteerStart3" type="date" aria-labelledby="th-periodVol volunteerStart3" aria-label="활동 시작일">
                                <input id="volunteerEnd3"   name="volunteerEnd3"   type="date" aria-labelledby="th-periodVol volunteerEnd3"   aria-label="활동 종료일">
                            </fieldset>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="volunteerOrg3" name="volunteerOrg3" type="text" aria-labelledby="th-orgVol volunteerOrg3">
                            </span>
                        </td>
                        <td>
                            <span class="ipt-clear">
                                <input id="volunteerDesc3" name="volunteerDesc3" type="text" aria-labelledby="th-descVol volunteerDesc3">
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</div><!--//form-content-->