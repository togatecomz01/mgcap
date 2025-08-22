$(window).on("load", function () {
    // select placeholder -> value
    let selectedText = $("#selectCustom select option:selected").text();
    $("#selectCustom .btn-fake-slt .value").text(selectedText);

    // select value�� tap-panel ��ȯ
    $("#yearSelect").on("change", function () {
        let target = $(this).val();
        $(".tab-panel").removeClass("active");
        $("#" + target).addClass("active");
    });
});

const financeData = {
    tab1: {
        year: "2024��",
        rows: [
            { label: "���� �� ��ġ��", value: "247,133" },
            { label: "�������ν� �����ڻ�", value: "0" },
            { label: "������-������ġ���������ڻ�", value: "684,522" },
            { label: "�ŵ����ɱ����ڻ�", value: "0" },
            { label: "��Ÿ��������-������ġ���������ڻ�", value: "2,732" },
            { label: "�뿩�ݹ׼���ä��", value: "0" },
            { label: "���Ŀ������� ����ä��", value: "911,160" },
            { label: "���� �� ��Ż�ڻ�", value: "498,318" },
            { label: "������� �� �����������ֽ�", value: "198,742" },
            { label: "�����ڻ�", value: "2,085" },
            { label: "��Ȯ���޿��ڻ�", value: "128" },
            { label: "�����μ��ڻ�", value: "1,091" },
            { label: "�̿����μ��ڻ�", value: "0" },
            { label: "�Ű������ڻ�", value: "0" },
            { label: "��Ÿ�ڻ�", value: "39,653" },
            { label: "�ڻ��Ѱ�", value: "2,585,593", total: true },
            { label: "������ �ν� ������ä", value: "0" },
            { label: "������-������ġ����������ä", value: "0" },
            { label: "���Ա�", value: "467,024" },
            { label: "��ä", value: "1,214,021" },
            { label: "����ȭ���Ժ�ä", value: "152,305" },
            { label: "��Ȯ���޿���ä", value: "0" },
            { label: "����ä", value: "178" },
            { label: "�����μ���ä", value: "0" },
            { label: "�̿����μ���ä", value: "10,773" },
            { label: "��Ÿ��ä", value: "220,117" },
            { label: "��ä�Ѱ�", value: "2,585,593", total: true },
            { label: "�ں���", value: "220,117" },
            { label: "�ں��׿���", value: "2,064,418" },
            { label: "�ں�����", value: "0" },
            { label: "��Ÿ�������ʹ����", value: "10,773" },
            { label: "�����׿���", value: "(2,310)" },
            { label: "�ں��Ѱ�", value: "521,175", total: true },
            { label: "��ä���ں��Ѱ�", value: "2,585,593", total: true },
        ],
    },
    tab1: {
        year: "2023��",
        rows: [
            { label: "���� �� ��ġ��", value: "222,757" },
            { label: "�������ν� �����ڻ�", value: "0" },
            { label: "������-������ġ���������ڻ�", value: "876,959" },
            { label: "�ŵ����ɱ����ڻ�", value: "0" },
            { label: "��Ÿ��������-������ġ���������ڻ�", value: "3,095" },
            { label: "�뿩�ݹ׼���ä��", value: "0" },
            { label: "���Ŀ������� ����ä��", value: "1,498,448" },
            { label: "���� �� ��Ż�ڻ�", value: "730,840" },
            { label: "������� �� �����������ֽ�", value: "273,762" },
            { label: "�����ڻ�", value: "786" },
            { label: "��Ȯ���޿��ڻ�", value: "831" },
            { label: "�����μ��ڻ�", value: "4,602" },
            { label: "�̿����μ��ڻ�", value: "0" },
            { label: "�Ű������ڻ�", value: "19,000" },
            { label: "��Ÿ�ڻ�", value: "47,943" },
            { label: "�ڻ��Ѱ�", value: "3,679,023", total: true },
            { label: "������ �ν� ������ä", value: "0" },
            { label: "������-������ġ����������ä", value: "0" },
            { label: "���Ա�", value: "468,590" },
            { label: "��ä", value: "2,145,550" },
            { label: "����ȭ���Ժ�ä", value: "134,234" },
            { label: "��Ȯ���޿���ä", value: "0" },
            { label: "����ä", value: "1,403" },
            { label: "�����μ���ä", value: "0" },
            { label: "�̿����μ���ä", value: "7,334" },
            { label: "��Ÿ��ä", value: "303,785" },
            { label: "��ä�Ѱ�", value: "3,060,896", total: true },
            { label: "�ں���", value: "62,838" },
            { label: "�ں��׿���", value: "164,740" },
            { label: "�ں�����", value: "0" },
            { label: "��Ÿ�������ʹ����", value: "10,773" },
            { label: "�����׿���", value: "(2,310)" },
            { label: "�ں��Ѱ�", value: "521,175", total: true },
            { label: "��ä���ں��Ѱ�", value: "2,585,593", total: true },
        ],
    },
};
const incomeData = {
    tab1: {
        year: "2024��",
        rows: [
            { label: "��������", value: "353,668" },
            { label: "��������", value: "(79,509)" },
            { label: "��������", value: "(74,705)" },
        ],
    },
    tab2: {
        year: "2024��",
        rows: [
            { label: "��������", value: "400,000" },
            { label: "��������", value: "(50,000)" },
            { label: "��������", value: "(45,000)" },
        ],
    },
};
