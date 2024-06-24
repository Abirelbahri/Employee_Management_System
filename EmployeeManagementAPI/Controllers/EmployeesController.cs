using Microsoft.AspNetCore.Mvc;
using EmployeeManagementAPI.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

[Route("api/[controller]")]
[ApiController]
public class EmployeesController : ControllerBase
{
    private readonly EmployeeContext _context;

    public EmployeesController(EmployeeContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            return NotFound();
        }

        return employee;
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
    {
        employee.Id = Guid.NewGuid();
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
    {
        if (id != employee.Id)
        {
            return BadRequest("Employee ID mismatch.");
        }

        _context.Entry(employee).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(Guid id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EmployeeExists(Guid id)
    {
        return _context.Employees.Any(e => e.Id == id);
    }
}
