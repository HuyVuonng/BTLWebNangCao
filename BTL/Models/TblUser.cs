using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BTL.Models;

public partial class TblUser
{
    public int Id { get; set; }

    [Display(Name = "Email")]
    [Required(ErrorMessage = "Email không được bỏ trống")]
    [EmailAddress(ErrorMessage = "Email chưa đúng định dạng")]
    public string SEmail { get; set; } = null!;

    [Display(Name = "Mật khẩu")]
    [DataType(DataType.Password)]
    [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
    [MinLength(2, ErrorMessage = "Mật khẩu phải có 2 kí tự trở lên")]
    public string SPassword { get; set; } = null!;

    public string? SRole { get; set; } = "User";

    public virtual ICollection<TblHistorySearch> TblHistorySearches { get; set; } = new List<TblHistorySearch>();

    public virtual ICollection<TblWord> TblWords { get; set; } = new List<TblWord>();
}
