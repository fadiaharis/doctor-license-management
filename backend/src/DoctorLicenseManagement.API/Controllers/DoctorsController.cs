using DoctorLicenseManagement.Application.Common;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Features.Doctors.Commands.CreateDoctor;
using DoctorLicenseManagement.Application.Features.Doctors.Commands.DeleteDoctor;
using DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctor;
using DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctorStatus;
using DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctorById;
using DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctors;
using DoctorLicenseManagement.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace DoctorLicenseManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly IMediator _mediator;

    public DoctorsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDoctorCommand command, CancellationToken cancellationToken)
    {
        // Create doctor
        var id = await _mediator.Send(command, cancellationToken);

        // Fetch full doctor using Query
        var doctor = await _mediator.Send(new GetDoctorByIdQuery(id), cancellationToken);

        // Wrap response
        var response = new ApiResponse<DoctorDto>(
            true,
            "Doctor created successfully",
            doctor
        );

        return CreatedAtAction(nameof(GetById), new { id }, response);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] string? status, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetDoctorsQuery(search, status), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetDoctorByIdQuery(id), cancellationToken);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDoctorCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
            return BadRequest();

        // Update
        await _mediator.Send(command, cancellationToken);

        // Fetch updated doctor
        var doctor = await _mediator.Send(new GetDoctorByIdQuery(id), cancellationToken);

        // Wrap response
        var response = new ApiResponse<DoctorDto>(
            true,
            "Doctor updated successfully",
            doctor
        );

        return Ok(response);
    }

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateDoctorStatusCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest(new { message = "Route id and body id do not match." });
        }

        await _mediator.Send(command, cancellationToken);

        // Fetch updated doctor
        var doctor = await _mediator.Send(new GetDoctorByIdQuery(id), cancellationToken);

        var response = new ApiResponse<DoctorDto>(
            true,
            "Doctor updated successfully",
            doctor
        );

        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteDoctorCommand(id), cancellationToken);

        var response = new ApiResponse<object>(
            true,
            "Doctor deleted successfully",
            null
        );

        return Ok(response);
    }
}
