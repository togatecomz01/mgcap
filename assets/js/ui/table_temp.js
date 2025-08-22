$(window).on("load", function () {
    // select placeholder -> value
    let selectedText = $("#selectCustom select option:selected").text();
    $("#selectCustom .btn-fake-slt .value").text(selectedText);

    // select value로 tap-panel 전환
    $("#yearSelect").on("change", function () {
        let target = $(this).val();
        $(".tab-panel").removeClass("active");
        $("#" + target).addClass("active");
    });
});

const financeData = {
    tab1: {
        year: "2024년",
        rows: [
            { label: "현금 및 예치금", value: "247,133" },
            { label: "당기손익인식 금융자산", value: "0" },
            { label: "당기손익-공정가치측정금융자산", value: "684,522" },
            { label: "매도가능금융자산", value: "0" },
            { label: "기타포괄손익-공정가치측정금융자산", value: "2,732" },
            { label: "대여금및수취채권", value: "0" },
            { label: "상각후원가측정 대출채권", value: "911,160" },
            { label: "리스 및 렌탈자산", value: "498,318" },
            { label: "공동기업 및 관계기업투자주식", value: "198,742" },
            { label: "유형자산", value: "2,085" },
            { label: "순확정급여자산", value: "128" },
            { label: "당기법인세자산", value: "1,091" },
            { label: "이연법인세자산", value: "0" },
            { label: "매각예정자산", value: "0" },
            { label: "기타자산", value: "39,653" },
            { label: "자산총계", value: "2,585,593", total: true },
            { label: "당기손익 인식 금융부채", value: "0" },
            { label: "당기손익-공정가치측정금융부채", value: "0" },
            { label: "차입금", value: "467,024" },
            { label: "사채", value: "1,214,021" },
            { label: "유동화차입부채", value: "152,305" },
            { label: "순확정급여부채", value: "0" },
            { label: "충당부채", value: "178" },
            { label: "당기법인세부채", value: "0" },
            { label: "이연법인세부채", value: "10,773" },
            { label: "기타부채", value: "220,117" },
            { label: "부채총계", value: "2,585,593", total: true },
            { label: "자본금", value: "220,117" },
            { label: "자본잉여금", value: "2,064,418" },
            { label: "자본조정", value: "0" },
            { label: "기타포괄손익누계액", value: "10,773" },
            { label: "이익잉여금", value: "(2,310)" },
            { label: "자본총계", value: "521,175", total: true },
            { label: "부채및자본총계", value: "2,585,593", total: true },
        ],
    },
    tab1: {
        year: "2023년",
        rows: [
            { label: "현금 및 예치금", value: "222,757" },
            { label: "당기손익인식 금융자산", value: "0" },
            { label: "당기손익-공정가치측정금융자산", value: "876,959" },
            { label: "매도가능금융자산", value: "0" },
            { label: "기타포괄손익-공정가치측정금융자산", value: "3,095" },
            { label: "대여금및수취채권", value: "0" },
            { label: "상각후원가측정 대출채권", value: "1,498,448" },
            { label: "리스 및 렌탈자산", value: "730,840" },
            { label: "공동기업 및 관계기업투자주식", value: "273,762" },
            { label: "유형자산", value: "786" },
            { label: "순확정급여자산", value: "831" },
            { label: "당기법인세자산", value: "4,602" },
            { label: "이연법인세자산", value: "0" },
            { label: "매각예정자산", value: "19,000" },
            { label: "기타자산", value: "47,943" },
            { label: "자산총계", value: "3,679,023", total: true },
            { label: "당기손익 인식 금융부채", value: "0" },
            { label: "당기손익-공정가치측정금융부채", value: "0" },
            { label: "차입금", value: "468,590" },
            { label: "사채", value: "2,145,550" },
            { label: "유동화차입부채", value: "134,234" },
            { label: "순확정급여부채", value: "0" },
            { label: "충당부채", value: "1,403" },
            { label: "당기법인세부채", value: "0" },
            { label: "이연법인세부채", value: "7,334" },
            { label: "기타부채", value: "303,785" },
            { label: "부채총계", value: "3,060,896", total: true },
            { label: "자본금", value: "62,838" },
            { label: "자본잉여금", value: "164,740" },
            { label: "자본조정", value: "0" },
            { label: "기타포괄손익누계액", value: "10,773" },
            { label: "이익잉여금", value: "(2,310)" },
            { label: "자본총계", value: "521,175", total: true },
            { label: "부채및자본총계", value: "2,585,593", total: true },
        ],
    },
};
const incomeData = {
    tab1: {
        year: "2024년",
        rows: [
            { label: "영업수익", value: "353,668" },
            { label: "영업이익", value: "(79,509)" },
            { label: "당기순이익", value: "(74,705)" },
        ],
    },
    tab2: {
        year: "2024년",
        rows: [
            { label: "영업수익", value: "400,000" },
            { label: "영업이익", value: "(50,000)" },
            { label: "당기순이익", value: "(45,000)" },
        ],
    },
};
