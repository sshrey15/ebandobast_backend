import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPatrolling = async (req, res) => {
  const { name, route, vehicleNumber, numofOfficers, patrolOfficers, supervisor, date , startTime , endTime , description } = req.body;

  try {
    const newPatrolling = await prisma.patrolling.create({
      data: {
        name,
        route,
        vehicleNumber,
        numofOfficers,
        patrolOfficers,
        supervisor,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        description,
      },
    });
    res.status(201).json(newPatrolling);
  } catch (error) {
    console.error('Error creating patrolling:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPatrollings = async (req, res) => {
  try {
    const patrollings = await prisma.patrolling.findMany();
    res.status(200).json(patrollings);
  } catch (error) {
    console.error('Error fetching patrollings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPatrolling = async (req, res) => {
  const { id } = req.params;

  try {
    const patrolling = await prisma.patrolling.findUnique({
      where: { id },
    });

    if (!patrolling) {
      return res.status(404).json({ message: 'Patrolling not found' });
    }

    res.status(200).json(patrolling);
  } catch (error) {
    console.error('Error fetching patrolling:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePatrolling = async (req, res) => {
  const { id } = req.params;
  const { name, route, vehicleNumber, numofOfficers, patrolOfficers, supervisor, date , startTime , endTime , description} = req.body;

  try {
    const updatedPatrolling = await prisma.patrolling.update({
      where: { id },
      data: { name, route, vehicleNumber, numofOfficers, patrolOfficers, supervisor, date , startTime , endTime ,description },
    });

    res.status(200).json(updatedPatrolling);
  } catch (error) {
    console.error('Error updating patrolling:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePatrolling = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.patrolling.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting patrolling:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};