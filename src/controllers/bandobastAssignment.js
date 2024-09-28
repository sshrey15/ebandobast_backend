import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBandobastAssignment = async (req, res) => {
  const { teamName, officerName, mobileNumber, supervisionOfficer, charterOfDuty, startTime, endTime, date, callSign, bandobastId } = req.body;

  try {
    const newAssignment = await prisma.bandobastAssignment.create({
      data: {
        teamName,
        officerName,
        mobileNumber,
        supervisionOfficer,
        charterOfDuty,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        date: new Date(date),
        callSign,
        bandobastId,
      },
    });
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error creating bandobast assignment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBandobastAssignments = async (req, res) => {
  try {
    const assignments = await prisma.bandobastAssignment.findMany();
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching bandobast assignments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBandobastAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const assignment = await prisma.bandobastAssignment.findUnique({
      where: { id },
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Bandobast assignment not found' });
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error('Error fetching bandobast assignment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBandobastAssignment = async (req, res) => {
  const { id } = req.params;
  const { teamName, officerName, mobileNumber, supervisionOfficer, charterOfDuty, startTime, endTime, date, callSign, bandobastId } = req.body;

  try {
    const updatedAssignment = await prisma.bandobastAssignment.update({
      where: { id },
      data: {
        teamName,
        officerName,
        mobileNumber,
        supervisionOfficer,
        charterOfDuty,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        date: new Date(date),
        callSign,
        bandobastId,
      },
    });

    res.status(200).json(updatedAssignment);
  } catch (error) {
    console.error('Error updating bandobast assignment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBandobastAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.bandobastAssignment.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting bandobast assignment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};