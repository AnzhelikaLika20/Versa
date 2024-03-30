﻿

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Infrastructure;

public class ApplicationDbContext  : IdentityDbContext<User>
{
    public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}