// script.js

// CSV形式に変換する関数
function convertToCSV(array) {
    const header = Object.keys(array[0]).join(',');
    const rows = array.map(obj => Object.values(obj).join(',')).join('\n');
    return header + '\n' + rows;
}

// ダウンロード関数
function downloadCSV(csv, filename) {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

const invitationForm = document.getElementById('invitationForm');

invitationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // フォームのデータを取得
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // CSV形式に変換
    const csvData = convertToCSV([data]);

    // CSVファイルとしてダウンロード
    downloadCSV(csvData, 'invitation_data.csv');
});
