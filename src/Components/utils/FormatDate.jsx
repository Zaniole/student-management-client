const FormatDate = (dateString) => {
        // Tạo một đối tượng Date từ chuỗi ngày tháng
        const date = new Date(dateString);
      
        // Lấy thông tin ngày, tháng, năm
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        // Kết hợp thành chuỗi định dạng "dd-mm-yyyy"
        const formattedDate = `${day}-${month}-${year}`;
      
        return formattedDate;
}

export default FormatDate