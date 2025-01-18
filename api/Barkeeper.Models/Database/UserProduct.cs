using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Barkeeper.Models.Database;

[Table("UserProduct")]
public partial class UserProduct {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public string UserId { get; set; } = null!;

    [Column("productId")]
    public int ProductId { get; set; }

    [Column("dateAdded", TypeName = "timestamp(3) without time zone")]
    public DateTime DateAdded { get; set; }

    [ForeignKey("ProductId")]
    [InverseProperty("UserProducts")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("UserProducts")]
    public virtual User User { get; set; } = null!;
}
