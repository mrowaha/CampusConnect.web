import pandas as pd

# Constants
pipe_radius = 0.065
fluid_viscosity = 1.00E-3
fluid_density = 1000

# Fluid velocities (descending order)
fluid_velocities = [0.5, 0.333333, 0.25, 0.2, 0.166667]

# Calculate Reynolds number
reynolds_numbers = [fluid_density * v * pipe_radius / (fluid_viscosity * 10) for v in fluid_velocities]

# Create a DataFrame
data = {
    'Pipe Diameter (m)': [pipe_radius] * 5,
    'Fluid Viscosity (Pa s)': [fluid_viscosity] * 5,
    'Fluid Velocity (m/s)': fluid_velocities,
    'Fluid Density (kg/m^3)': [fluid_density] * 5,
    'Reynolds Number': reynolds_numbers
}

df = pd.DataFrame(data)

# Print the DataFrame
print(df)